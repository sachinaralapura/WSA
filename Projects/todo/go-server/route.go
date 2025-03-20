package main

import "github.com/gorilla/mux"

func SetUpRoutes(router *mux.Router) *mux.Router {

	router.HandleFunc("/tasks", SendAllTasks).Methods("GET")

	router.HandleFunc("/task", CreateNewTask).Methods("POST")

	router.HandleFunc("/task/{id}", UpdateTask).Methods("PUT")

	router.HandleFunc("/task/{id}", DeleteTask).Methods("DELETE")

	return router
}
