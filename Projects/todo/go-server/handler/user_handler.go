package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
	"todoserver/common"
	"todoserver/model"
	"todoserver/services"
)

type UserHandler struct {
	*services.AuthService
	*services.UserService
}

// LoginHandler is a controller to login a user
func (h *UserHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var err error

	// extract email and password from the request
	var user model.UserSchema
	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request")
		return
	}

	// check if the user exists in the database
	ok, _ := h.CheckUserExists(user)
	if !ok {
		common.ResponseWriter(w, http.StatusConflict, false, "User doesn't exists")
		return
	}

	user, err = h.GetUser(user.Email)
	if err != nil {
		common.ResponseWriter(w, http.StatusUnauthorized, false, err.Error())
		return
	}

	// if user exists, generate a JWT token and set it in the cookie
	token, _ := h.AuthService.GenerateJWT(user.Id.Hex(), user.Role, user.Name, user.Email)
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		HttpOnly: true,
		Secure:   true,                  // Change to true in production (HTTPS required)
		SameSite: http.SameSiteNoneMode, // Required for cross-origin requests
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour), // Cookie expiry
	})
	common.ResponseWriter(w, http.StatusOK, true, "User logged in successfully")
}

// RegisterHandler is a controller to register a new user
func (h *UserHandler) RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	// extract Name, email and password from the request
	var user model.UserSchema
	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		common.ResponseWriter(w, http.StatusBadRequest, false, "Invalid request")
		return
	}

	// check if the user exists in the database
	ok, _ := h.CheckUserExists(user)
	if ok {
		common.ResponseWriter(w, http.StatusConflict, false, "User already exists")
		return
	}

	// if user does not exist, create a new user
	ok, newUser := h.AddNewUser(user)
	if !ok {
		common.ResponseWriter(w, http.StatusInternalServerError, false, "Something went wrong. Please try again later.")
		return
	}

	// Generate JWT Token
	token, err := h.GenerateJWT(newUser.Id.Hex(), "USER", newUser.Name, newUser.Email)
	if err != nil {
		log.Println(err)
		common.ResponseWriter(w, http.StatusInternalServerError, false, "could not sign token")
		return
	}

	cookie := &http.Cookie{
		Name:     "token",
		Value:    token,
		HttpOnly: true,
		Secure:   false,
		MaxAge:   24 * 60 * 60, // 1 day expiration in seconds
		Path:     "/",
	}

	http.SetCookie(w, cookie)
	common.ResponseWriter(w, http.StatusCreated, true, "User registered successfully")
}
