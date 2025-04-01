package model

import (
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	UserSchema struct {
		Id       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
		Name     string             `bson:"name" json:"name"`
		Email    string             `bson:"email" json:"email"`
		Password string             `bson:"password,omitempty" json:"password,omitempty"`
		Role     string             `bson:"role,omitempty" json:"role,omitempty"`
		Picture  string             `bson:"picture,omitempty" json:"picture,omitempty"`
		IsGoogle bool               `bson:"isgoogle,omitempty" json:"isgoogle,omitempty"`
	}

	TaskSchema struct {
		Id          primitive.ObjectID `bson:"_id,omitempty"`
		UserId      primitive.ObjectID `bson:"user_id"`
		Title       string             `bson:"title"`
		Description string             `bson:"description"`
		Status      string             `bson:"status,omitempty"`
		Labels      []string           `bson:"labels,omitempty"`
		DueDate     primitive.DateTime `bson:"due_date,omitempty"`
		CreatedOn   primitive.DateTime `bson:"added_on,omitempty"`
	}

	Task struct {
		Id          string   `json:"_id"`
		UserId      string   `json:"user_id"`
		Title       string   `json:"title"`
		Description string   `json:"description"`
		Status      string   `json:"status,omitempty"`
		Labels      []string `json:"labels,omitempty"`
		DueDate     string   `json:"due_date,omitempty"`
		AddedOn     string   `json:"added_on,omitempty"`
	}

	JWTClaims struct {
		UserId string `json:"user_id"`
		Role   string `json:"role"`
		Name   string `json:"name"`
		Email  string `json:"email"`
		jwt.RegisteredClaims
	}

	Response struct {
		Success bool   `json:"success"`
		Message string `json:"message"`
		Data    any    `json:"data,omitempty"`
	}

	Labels struct {
		ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
		Labels []string           `bson:"labels" json:"labels"`
	}

	QueryParams struct {
		SortBy   string
		SortType string
		Status   []string
		Labels   []string
		Page     int
		Limit    int
	}
)

// String returns a string representation of the UserSchema
func (u UserSchema) String() string {
	return fmt.Sprintf(
		"UserSchema{Id: %s, Name: %s, Email: %s, Role: %s, Picture: %s, IsGoogle: %t}",
		u.Id.String(), u.Name, u.Email, u.Role, u.Picture, u.IsGoogle,
	)
}

// String method to provide a string representation of Task
func (t Task) String() string {
	return fmt.Sprintf(
		"Task(ID: %s, Title: %s, Description: %s, Status: %s, Labels: [%s], Due Date: %s, Added On: %s)",
		t.Id,
		t.Title,
		t.Description,
		t.Status,
		strings.Join(t.Labels, ", "),
		t.DueDate,
		t.AddedOn,
	)
}
