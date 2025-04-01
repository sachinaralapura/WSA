package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"
	"todoserver/common"
	"todoserver/common/database"
	"todoserver/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type TaskService struct {
	*database.Database
}

func (a *TaskService) Serve() {}

func (a *TaskService) GetTaskService(userID string, query map[string][]string) ([]model.Task, error) {

	var queryParams model.QueryParams = a.ParseQueryParams(query)
	userId, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, errors.New("error fetching tasks")
	}
	var queryFilter bson.M = bson.M{"user_id": userId} // Filter tasks by user ID
	findOptions := options.Find()

	// Apply status filter
	if len(queryParams.Status) > 0 {
		queryFilter["status"] = bson.M{"$in": queryParams.Status}
	}

	// Apply labels filter
	if len(queryParams.Labels) > 0 {
		queryFilter["labels"] = bson.M{"$in": queryParams.Labels}
	}

	// Apply sorting options
	if queryParams.SortBy == "added_on" || queryParams.SortBy == "due_date" {
		sortOrder := 1
		if queryParams.SortType == "desc" {
			sortOrder = -1
		}
		findOptions.SetSort(bson.M{queryParams.SortBy: sortOrder})
	}

	// Fetch tasks from MongoDB
	taskCollection := a.GetTaskCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := taskCollection.Find(ctx, queryFilter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var t []model.TaskSchema
	if err = cursor.All(ctx, &t); err != nil {
		return nil, err
	}
	var tasks []model.Task
	for _, v := range t {
		tasks = append(tasks, common.ConvertTaskSchemaToTask(v))
	}
	return tasks, nil
}

func (a *TaskService) GetAllLabelsService(userId string) ([]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	userid, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return nil, errors.New("unathorized")
	}

	collection := a.GetTaskCollection()
	// Define a filter to only get tasks for the specified user.
	filter := bson.M{"user_id": userid}

	distinctLabels, err := collection.Distinct(ctx, "labels", filter)
	if err != nil {
		return nil, fmt.Errorf("error getting distinct labels: %w", err)
	}
	// Convert the result to a slice of strings.
	labels := make([]string, 0, len(distinctLabels))
	for _, label := range distinctLabels {
		labelStr, ok := label.(string) // Type assertion.
		if !ok {
			log.Printf("unexpected type for label: %T, value: %v", label, label)
			continue
		}
		labels = append(labels, labelStr)
	}
	return labels, nil
}

func (t *TaskService) CreateTaskService(userId string, task model.Task) (*model.TaskSchema, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if task.Title == "" || task.Description == "" {
		return nil, errors.New("title or description is empty")
	}

	userid, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return nil, errors.New("unathorized")
	}
	collection := t.GetTaskCollection()

	taskDocument := &model.TaskSchema{
		Id:          primitive.NewObjectID(),
		UserId:      userid,
		Title:       task.Title,
		Description: task.Description,
		Status:      "Open",
		Labels:      task.Labels,
		DueDate:     common.ConvertIsoToPrimitive(task.DueDate),
		CreatedOn:   primitive.NewDateTimeFromTime(time.Now()),
	}

	_, err = collection.InsertOne(ctx, taskDocument)
	if err != nil {
		return nil, errors.New("error creating new task")
	}
	return taskDocument, nil
}

func (t *TaskService) UpdateTaskService(id, userID string, task model.Task) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	taskId, err := primitive.ObjectIDFromHex(task.Id)
	if err != nil {
		return errors.New("invalid task id")
	}

	userId, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid user")
	}

	if task.Title == "" || task.Description == "" {
		return errors.New("title or description is empty")
	}

	collection := t.GetTaskCollection()

	filter := bson.M{"_id": taskId, "user_id": userId}
	updateFields := bson.M{
		"title":       task.Title,
		"description": task.Description,
		"due_date":    common.ConvertIsoToPrimitive(task.DueDate),
	}

	update := bson.M{"$set": updateFields}
	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.New("error updating task")
	}

	if result.MatchedCount == 0 {
		return errors.New("task not found")
	}

	return nil
}

func (t *TaskService) DeleteTaskService(id string, userID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	taskId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid task id")
	}

	userId, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid User")
	}

	collection := t.GetTaskCollection()
	result, err := collection.DeleteOne(ctx, bson.M{"_id": taskId, "user_id": userId})
	if err != nil {
		return errors.New("error deleting task")
	}
	if result.DeletedCount == 0 {
		return errors.New("task not found")
	}
	return nil
}

// Parse query parameters into QueryParams struct
func (t *TaskService) ParseQueryParams(queryParams map[string][]string) model.QueryParams {
	params := model.QueryParams{Limit: 10, Page: 1} // Default values

	if sortBy, exists := queryParams["sort_by"]; exists {
		params.SortBy = sortBy[0]
	}

	if sortType, exists := queryParams["sort_type"]; exists {
		params.SortType = sortType[0]
	}

	if status, exists := queryParams["status"]; exists {
		json.Unmarshal([]byte(status[0]), &params.Status)
	}

	if labels, exists := queryParams["labels"]; exists {
		var parsedLabels []string
		json.Unmarshal([]byte(labels[0]), &parsedLabels)
		params.Labels = parsedLabels
	}

	if page, exists := queryParams["page"]; exists {
		if p, err := strconv.Atoi(page[0]); err == nil && p > 0 {
			params.Page = p
		}
	}

	if limit, exists := queryParams["limit"]; exists {
		if l, err := strconv.Atoi(limit[0]); err == nil && l > 0 {
			params.Limit = l
		}
	}

	return params
}

func (t *TaskService) UpdateLabelService(id string, userID string, labels []string) error {
	var err error
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := t.GetTaskCollection()

	taskId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid task Id")
	}
	userId, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid User Id")
	}
	filter := bson.M{"_id": taskId, "user_id": userId}
	update := bson.M{"$set": bson.M{"labels": labels}}

	_, err = collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.New("error updating Labels")
	}
	return nil
}

func (t *TaskService) UpdateStatusService(id string, userID string, status string) error {
	var err error
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := t.GetTaskCollection()

	taskId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid task Id")
	}
	userId, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return errors.New("invalid User Id")
	}

	filter := bson.M{"_id": taskId, "user_id": userId}
	update := bson.M{"$set": bson.M{"status": status}}
	_, err = collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return errors.New("error updating status")
	}
	return nil
}

// ------------------------------------------------------------------------

// func GetAllTask() ([]model.Task, error) {
// 	collection := getTaskCollection()
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	cursor, err := collection.Find(ctx, bson.M{})
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer cursor.Close(ctx)

// 	var taskSchemas []model.TaskSchema
// 	if err := cursor.All(ctx, &taskSchemas); err != nil {
// 		return nil, err
// 	}

// 	// Convert TaskSchema (MongoDB format) to Task (JSON format)
// 	var tasks []model.Task
// 	for _, t := range taskSchemas {
// 		tasks = append(tasks, TaskSchemaToTask(t))
// 	}
// 	return tasks, nil
// }

// func CreateTask(task model.Task) error {
// 	collection := getTaskCollection()
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	newTask := &model.TaskSchema{
// 		Id:          primitive.NewObjectID(),
// 		Title:       task.Title,
// 		Description: task.Description,
// 		// DueDate:     primitive.NewDateTimeFromTime(task.DueDate),
// 	}
// 	_, err := collection.InsertOne(ctx, newTask)
// 	if err != nil {
// 		log.Println("error creating task")
// 		return err
// 	}
// 	return nil
// }

// func EditTask(id string, task model.Task) error {
// 	collection := getTaskCollection()
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	objId, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return fmt.Errorf("invalid task ID: %w", err)
// 	}
// 	// Prepare the update document with $set
// 	update := bson.M{
// 		"$set": bson.M{
// 			"title":       task.Title,
// 			"description": task.Description,
// 			"due_date":    primitive.NewDateTimeFromTime(task.DueDate),
// 		},
// 	}

// 	result := collection.FindOneAndUpdate(ctx, bson.M{"_id": objId}, update)
// 	if result.Err() != nil {
// 		return fmt.Errorf("failed to update task: %w", result.Err())
// 	}
// 	return nil
// }

// func RemoveTask(id string) error {
// 	collection := getTaskCollection()
// 	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
// 	defer cancel()

// 	objId, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return fmt.Errorf("invalid task ID: %w", err)
// 	}

// 	_, err = collection.DeleteOne(ctx, bson.M{"_id": objId})
// 	if err != nil {
// 		return fmt.Errorf("failed to delete task")
// 	}
// 	return nil
// }

// convert from TaskSchema to Task type
// func TaskSchemaToTask(t model.TaskSchema) model.Task {
// 	return model.Task{
// 		Id:          t.Id.Hex(),
// 		Title:       t.Title,
// 		Description: t.Description,
// 		// DueDate:     t.DueDate.Time(),
// 	}
// }
