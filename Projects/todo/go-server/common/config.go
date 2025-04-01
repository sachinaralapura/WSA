package common

import (
	"crypto/rsa"
	"log"
	"os"

	"github.com/joho/godotenv"
)

const (
	// openssl genrsa -out app.rsa 1024
	privKeyPath = "keys/app.rsa"
	// openssl rsa -in app.rsa -pubout > app.rsa.pub
	pubKeyPath = "keys/app.rsa.pub"
)

type Config struct {
	port       string
	mongoDbUrl string
	signKey    *rsa.PrivateKey
	verifyKey  *rsa.PublicKey
}

func (c *Config) GetPort() string {
	return c.port
}

func (c *Config) GetMongoDbUrl() string {
	return c.mongoDbUrl
}

func (c *Config) GetSignKey() *rsa.PrivateKey {
	return c.signKey
}

func (c *Config) GetVerifyKey() *rsa.PublicKey {
	return c.verifyKey
}

func Init() *Config {
	var err error
	if err = godotenv.Load(); err != nil {
		log.Fatal("error loading configuration : ", err)
	}

	signKey, verifyKey := readKey()
	config := &Config{
		port:       os.Getenv("PORT"),
		mongoDbUrl: os.Getenv("MONGODBURL"),
		signKey:    signKey,
		verifyKey:  verifyKey,
	}
	return config
}

func NewConfig() *Config {
	var config *Config = Init()
	return config
}
