package common

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"log"
	"net/http"
	"os"
	"time"
	"todoserver/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// ResponseWriter is a helper function to write response to the client
// It takes http.ResponseWriter, status code, status and message
// It writes the response in JSON format
func ResponseWriter(w http.ResponseWriter, code int, status bool, message string) {
	response := model.Response{
		Success: status,
		Message: message,
	}
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(response)
}

func UnauthorizedResponse(w http.ResponseWriter) {
	response := model.Response{
		Success: false,
		Message: "User is not Authorized",
	}
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(response)
}

func InternalServerErrorResonse(w http.ResponseWriter, message string) {
	response := model.Response{
		Success: false,
		Message: message,
	}
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(response)
}

func ResponseWithData(w http.ResponseWriter, code int, status bool, message string, data any) {
	response := model.Response{
		Success: status,
		Message: message,
		Data:    data,
	}
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(response)
}

func readKey() (*rsa.PrivateKey, *rsa.PublicKey) {
	return readPrivateKey(), readPublicKey()
}

func readPrivateKey() *rsa.PrivateKey {
	var err error

	signKey, err := os.ReadFile(privKeyPath)
	if err != nil {
		log.Fatal("Error Reading Private key")
		return nil
	}

	block, _ := pem.Decode(signKey)
	if block == nil || block.Type != "PRIVATE KEY" {
		log.Fatal("Error Decoding Private key")
		return nil
	}

	parsedSignKeyKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		log.Fatal("Error Decoding Private key")
		return nil
	}
	return parsedSignKeyKey.(*rsa.PrivateKey)
}

func ConvertIsoToPrimitive(iso string) primitive.DateTime {
	var dueDate primitive.DateTime
	if iso != "" {
		parsedTime, err := time.Parse(time.RFC3339, iso)
		if err == nil {
			dueDate = primitive.NewDateTimeFromTime(parsedTime)
		}
	}
	return dueDate
}

func ConvertTaskSchemaToTask(taskSchema model.TaskSchema) model.Task {
	return model.Task{
		Id:          taskSchema.Id.Hex(),
		UserId:      taskSchema.UserId.Hex(),
		Title:       taskSchema.Title,
		Description: taskSchema.Description,
		Status:      taskSchema.Status,
		Labels:      taskSchema.Labels,
		DueDate:     convertDateTimeToString(taskSchema.DueDate),
		AddedOn:     convertDateTimeToString(taskSchema.CreatedOn),
	}
}

func convertDateTimeToString(dateTime primitive.DateTime) string {
	if dateTime.Time().IsZero() {
		return ""
	}
	return dateTime.Time().Format(time.RFC3339)
}

func readPublicKey() *rsa.PublicKey {
	var err error
	verifyKey, err := os.ReadFile(pubKeyPath)
	if err != nil {
		log.Fatal("Error Reading public Key")
		return nil
	}

	block, _ := pem.Decode(verifyKey)
	if block == nil || block.Type != "PUBLIC KEY" {
		log.Fatal("Error Decoding Public key")
		return nil
	}

	parsedVerifyKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		log.Fatal("Error Decoding Public key")
		return nil
	}
	return parsedVerifyKey.(*rsa.PublicKey)
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
