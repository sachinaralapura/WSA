package handler

import (
	"encoding/json"
	"net/http"
	"todoserver/common"
	"todoserver/middlewares"
	"todoserver/model"
	"todoserver/services"

	"github.com/gorilla/mux"
)

type TaskHandler struct {
	*services.TaskService
}

// GET [api/v2/tasks]
func (t *TaskHandler) GetAllTasks(w http.ResponseWriter, r *http.Request) {

	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.ResponseWriter(w, http.StatusUnauthorized, false, "User is not Authorized")
	}

	queryParams := r.URL.Query()

	tasks, err := t.TaskService.GetTaskService(userId, queryParams)
	if err != nil {
		common.InternalServerErrorResonse(w, "Failed to fetch tasks")
		return
	}
	common.ResponseWithData(w, http.StatusOK, true, "success", tasks)
}

// GET [api/v2/tasks/labels]
func (t *TaskHandler) GetAllLabels(w http.ResponseWriter, r *http.Request) {
	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	labels, err := t.TaskService.GetAllLabelsService(userId)
	if err != nil {
		common.InternalServerErrorResonse(w, "Failed to fetch labels")
		return
	}
	if len(labels) == 0 {
		common.ResponseWriter(w, http.StatusBadRequest, false, "No labels found") // Corrected status code
		return
	}
	common.ResponseWithData(w, http.StatusOK, true, "successful", labels)
}

// POST [api/v2/tasks]
func (t *TaskHandler) CreateNewTask(w http.ResponseWriter, r *http.Request) {
	var requestBody model.Task

	// Extract userID
	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request payload")
		return
	}
	if requestBody.Title == "" || requestBody.Description == "" {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Title or description is empty")
		return
	}
	result, err := t.CreateTaskService(userId, requestBody)
	if err != nil {
		common.InternalServerErrorResonse(w, err.Error())
		return
	}
	common.ResponseWithData(w, http.StatusOK, true, "New Task created", result)
}

// PUT [api/v2/tasks/id]
func (t *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {
	var err error

	vars := mux.Vars(r)
	id := vars["id"]
	userid, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	var requestBody model.Task
	if err = json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request payload")
		return
	}
	if err = t.UpdateTaskService(id, userid, requestBody); err != nil {
		common.InternalServerErrorResonse(w, err.Error())
		return
	}
	common.ResponseWriter(w, http.StatusOK, true, "task updated successfully")
}

// PUT [api/v2/tasks/id/labels]
func (t *TaskHandler) UpdateLabels(w http.ResponseWriter, r *http.Request) {
	var err error

	vars := mux.Vars(r)
	id := vars["id"]

	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	var requestBody model.Labels
	if err = json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request payload")
		return
	}
	err = t.TaskService.UpdateLabelService(id, userId, requestBody.Labels)
	if err != nil {
		common.InternalServerErrorResonse(w, err.Error())
		return
	}
	common.ResponseWriter(w, http.StatusOK, true, "labels updated successfully")
}

// PUT [api/v2/tasks/id/status]
func (t *TaskHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	var err error

	vars := mux.Vars(r)
	id := vars["id"]

	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	var requestBody struct {
		Status string `json:"status"`
	}
	if err = json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request payload")
		return
	}
	// Validate status
	validStatuses := map[string]bool{"Open": true, "In-Progress": true, "Completed": true}
	if _, isValid := validStatuses[requestBody.Status]; !isValid {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid status data")
		return
	}
	err = t.TaskService.UpdateStatusService(id, userId, requestBody.Status)
	if err != nil {
		common.InternalServerErrorResonse(w, err.Error())
	}
	common.ResponseWriter(w, http.StatusOK, true, "Status updated successfully")
}

// DELETE [api/v2/tasks/id]
func (t *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	userId, ok := middlewares.GetUserId(r)
	if !ok {
		common.UnauthorizedResponse(w)
		return
	}
	err := t.DeleteTaskService(id, userId)
	if err != nil {
		common.InternalServerErrorResonse(w, err.Error())
		return
	}
	common.ResponseWriter(w, http.StatusOK, true, "Task deleted Successfully")
}
