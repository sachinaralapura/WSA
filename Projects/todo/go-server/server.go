package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewServer(router *mux.Router) *http.Server {
	port := AppConfig.Port
	server := &http.Server{
		Addr:    port,
		Handler: router,
	}
	return server
}
