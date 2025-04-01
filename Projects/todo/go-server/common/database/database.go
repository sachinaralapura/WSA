package database

import (
	"context"
	"log"
	"time"
	"todoserver/common"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	*mongo.Client
}

func (db *Database) Close() {
	if db.Client != nil {
		db.Client.Disconnect(context.Background())
	}
}

func (db *Database) GetTaskCollection() *mongo.Collection {
	todo := db.Client.Database("todo")
	return todo.Collection("tasks")
}

func (db *Database) GetUserCollection() *mongo.Collection {
	todo := db.Client.Database("todo")
	return todo.Collection("users")
}

func connect(config *common.Config) *Database {
	uri := config.GetMongoDbUrl()

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI).SetTimeout(10 * time.Second)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// create new client
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}
	log.Println("Connected to MongoDB!")
	return &Database{client}
}

func GetMongoClinet(config *common.Config) *Database {
	var database *Database = connect(config)
	return database
}
