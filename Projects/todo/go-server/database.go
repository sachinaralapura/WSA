package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

func Connect() {
	uri := AppConfig.MongoDbUrl
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI).SetTimeout(10 * time.Second)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// create new client
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		panic(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}
	log.Println("Connected to MongoDB!")

	database := client.Database("todo")
	if err := database.CreateCollection(ctx, "tasks"); err != nil {
		log.Println("error creating user collection")
	}
	log.Println("users collection created")
	mongoClient = client
}

func GetMongoClinet() *mongo.Client {
	if mongoClient != nil {
		return mongoClient
	}
	Connect()
	return mongoClient
}

func getTaskCollection() *mongo.Collection {
	todo := mongoClient.Database("todo")
	return todo.Collection("tasks")
}

func GetAllTask() ([]Task, error) {
	collection := getTaskCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var taskSchemas []TaskSchema
	if err := cursor.All(ctx, &taskSchemas); err != nil {
		return nil, err
	}

	// Convert TaskSchema (MongoDB format) to Task (JSON format)
	var tasks []Task
	for _, t := range taskSchemas {
		tasks = append(tasks, TaskSchemaToTask(t))
	}
	return tasks, nil
}

func CreateTask(task Task) error {
	collection := getTaskCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	newTask := &TaskSchema{
		Id:          primitive.NewObjectID(),
		Title:       task.Title,
		Description: task.Description,
		DueDate:     primitive.NewDateTimeFromTime(task.DueDate),
	}
	_, err := collection.InsertOne(ctx, newTask)
	if err != nil {
		log.Println("error creating task")
		return err
	}
	return nil
}

func EditTask(id string, task Task) error {
	collection := getTaskCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid task ID: %w", err)
	}
	// Prepare the update document with $set
	update := bson.M{
		"$set": bson.M{
			"title":       task.Title,
			"description": task.Description,
			"due_date":    primitive.NewDateTimeFromTime(task.DueDate),
		},
	}

	result := collection.FindOneAndUpdate(ctx, bson.M{"_id": objId}, update)
	if result.Err() != nil {
		return fmt.Errorf("failed to update task: %w", result.Err())
	}
	return nil
}

func RemoveTask(id string) error {
	collection := getTaskCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid task ID: %w", err)
	}

	_, err = collection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return fmt.Errorf("failed to delete task")
	}
	return nil
}

// convert from TaskSchema to Task type
func TaskSchemaToTask(t TaskSchema) Task {
	return Task{
		Id:          t.Id.Hex(),
		Title:       t.Title,
		Description: t.Description,
		DueDate:     t.DueDate.Time(),
	}
}
