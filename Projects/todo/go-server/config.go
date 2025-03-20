package main

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port       string
	MongoDbUrl string
}

var AppConfig *Config

func LoadConfig() error {
	err := godotenv.Load()
	if err != nil {
		return err
	}

	config := &Config{
		Port:       os.Getenv("PORT"),
		MongoDbUrl: os.Getenv("MONGODBURL"),
	}
	AppConfig = config
	return nil
}
