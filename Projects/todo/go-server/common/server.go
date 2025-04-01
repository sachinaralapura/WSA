package common

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewServer(router *mux.Router, config *Config) *http.Server {

	port := config.GetPort()
	server := &http.Server{
		Addr:    port,
		Handler: router,
	}
	return server
}
