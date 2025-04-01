package routers

import (
	"todoserver/handler"

	"github.com/gorilla/mux"
)

func SetUserRoutes(router *mux.Router, userHandler *handler.UserHandler) *mux.Router {

	router.HandleFunc("/register", userHandler.RegisterHandler).Methods("POST")

	router.HandleFunc("/login", userHandler.LoginHandler).Methods("POST")

	return router
}

func SetTaskRoutes(router *mux.Router, taskHandler *handler.TaskHandler) *mux.Router {

	// get all task GET [api/v2/tasks]
	router.HandleFunc("", taskHandler.GetAllTasks).Methods("GET")

	// get all labels GET [api/v2/tasks/labels]
	router.HandleFunc("/labels", taskHandler.GetAllLabels).Methods("GET")

	// create new task POST [api/v2/tasks]
	router.HandleFunc("", taskHandler.CreateNewTask).Methods("POST")

	// update task PUT [api/v2/tasks/id]
	router.HandleFunc("/{id}", taskHandler.UpdateTask).Methods("PUT")

	// update task label PUT [api/v2/tasks/id/labels]
	router.HandleFunc("/{id}/labels", taskHandler.UpdateLabels).Methods("PUT")

	// update task status PUT [api/v2/tasks/id/status]
	router.HandleFunc("/{id}/status", taskHandler.UpdateStatus).Methods("PUT")

	// delete a task DELETE [api/v2/tasks/id]
	router.HandleFunc("/{id}", taskHandler.DeleteTask).Methods("DELETE")

	return router
}
