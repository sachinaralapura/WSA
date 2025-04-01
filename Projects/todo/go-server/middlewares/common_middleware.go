package middlewares

import (
	"log"
	"net/http"
	"os"
	"todoserver/services"

	"github.com/gorilla/handlers"
)

type Middleware struct {
	*services.AuthService
}

func (m *Middleware) JSONMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func (m *Middleware) LoggingMiddleware(next http.Handler) http.Handler {
	file, err := os.OpenFile("server.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal("Error opening log file")
	}
	defer file.Close()
	return handlers.LoggingHandler(file, next)
}
