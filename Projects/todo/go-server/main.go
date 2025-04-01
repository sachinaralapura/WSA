package main

import (
	"log"
	"todoserver/common"
	"todoserver/common/database"
	"todoserver/handler"
	"todoserver/middlewares"
	"todoserver/routers"
	"todoserver/services"

	"github.com/gorilla/mux"
)

func main() {
	config := common.NewConfig() // load Environment variables and keys

	// connect to database
	database := database.GetMongoClinet(config)
	defer database.Close()

	autherService := &services.AuthService{Config: config}
	userService := &services.UserService{Database: database}
	taskService := &services.TaskService{Database: database}
	middleWares := &middlewares.Middleware{AuthService: autherService}

	userHandler := &handler.UserHandler{AuthService: autherService, UserService: userService}
	taskHandler := &handler.TaskHandler{TaskService: taskService}

	r := mux.NewRouter() // create a Global router
	// r.Use(middleWares.LoggingMiddleware) // Logging Middleware
	// r.Use(handlers.CORS(handlers.AllowedOrigins([]string{"http://localhost:5173"})))
	r.Use(middleWares.JSONMiddleware) // JSON Middleware

	apiRouter := r.PathPrefix("/api/v2").Subrouter() // API versioning router

	userRouter := apiRouter.PathPrefix("/user").Subrouter() // user router
	routers.SetUserRoutes(userRouter, userHandler)          // set user routes

	taskRouter := apiRouter.PathPrefix("/tasks").Subrouter() // task router
	taskRouter.Use(middleWares.Authorize)                    // Authorization middleware
	routers.SetTaskRoutes(taskRouter, taskHandler)           // set task routes

	server := common.NewServer(r, config) // create a server

	log.Println("listening on Port", config.GetPort())
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Error starting server", err)
	}
}
