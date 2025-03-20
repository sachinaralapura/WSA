package main

import (
	"context"
	"log"

	"github.com/gorilla/mux"
)

func main() {
	// load Environment variables
	if err := LoadConfig(); err != nil {
		log.Fatal("error loading configuration : ", err)
	}

	// connect to database
	mongoClient := GetMongoClinet()
	defer mongoClient.Disconnect(context.Background())

	// create a router
	r := mux.NewRouter()
	r = r.PathPrefix("/api/v1").Subrouter()
	r = SetUpRoutes(r)
	server := NewServer(r)

	// listen
	log.Println("listening on Port : ", AppConfig.Port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Error starting server", err)
	}
}
