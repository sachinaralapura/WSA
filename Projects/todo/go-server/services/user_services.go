package services

import (
	"context"
	"errors"
	"log"
	"time"
	"todoserver/common"
	"todoserver/common/database"
	"todoserver/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	*database.Database
}

func (s *UserService) Serve() {}

func (s *UserService) AddNewUser(user model.UserSchema) (bool, *model.UserSchema) {
	collection := s.GetUserCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	hashedPassword, err := common.HashPassword(user.Password)
	if err != nil {
		log.Fatal("Error hashing password:", err)
	}

	newUser := model.UserSchema{
		Id:       primitive.NewObjectID(),
		Name:     user.Name,
		Email:    user.Email,
		Password: hashedPassword,
		Role:     user.Role,
		Picture:  user.Picture,
		IsGoogle: user.IsGoogle,
	}

	result, err := collection.InsertOne(ctx, newUser)
	if err != nil {
		log.Println("Error inserting user")
		return false, nil
	}
	log.Println("User inserted with ID:", result.InsertedID)
	return true, &newUser
}

func (s *UserService) GetUserById(id string) (model.UserSchema, error) {
	// TODO : Implement the logic to get a user
	return model.UserSchema{}, nil
}

func (s *UserService) GetUser(email string) (model.UserSchema, error) {
	collection := s.GetUserCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"email": email}
	var user model.UserSchema
	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		var errMsg string
		if err == mongo.ErrNoDocuments {
			errMsg = "User not found"
		} else {
			errMsg = "Error fetching user:"
		}
		return model.UserSchema{}, errors.New(errMsg) // Return error if user not found
	}
	return user, nil
}

func (s *UserService) CheckUserExists(user model.UserSchema) (bool, error) {
	collection := s.GetUserCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"email": user.Email}

	var u model.UserSchema
	err := collection.FindOne(ctx, filter).Decode(&u)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Println("User does not exist")
			return false, nil
		}
		return false, err
	}
	return true, nil
}
