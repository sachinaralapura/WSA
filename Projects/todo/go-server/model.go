package main

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TaskSchema struct {
	Id          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title"`
	Description string             `bson:"description"`
	DueDate     primitive.DateTime `bson:"due_date"`
}

type Task struct {
	Id          string    `json:"_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"due_date"`
}

type RequestBody struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	DueDate     string `json:"due_date"`
}

type Response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
