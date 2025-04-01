package middlewares

import (
	"context"
	"net/http"
	"todoserver/common"
	"todoserver/model"
)

type contextKey string

const userKey contextKey = "user"

// Middleware for validating JWT tokens
func (m *Middleware) Authorize(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := r.Cookie("token")
		if err != nil {
			common.ResponseWriter(w, http.StatusUnauthorized, false, "Unauthorized")
			return
		}

		// verify token
		claims, err := m.VerifyJWT(token.Value)
		if err != nil {
			common.ResponseWriter(w, http.StatusUnauthorized, false, "Invalid token")
			return
		}

		ctx := context.WithValue(r.Context(), userKey, claims)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetUserId(r *http.Request) (string, bool) {
	claims, ok := r.Context().Value(userKey).(*model.JWTClaims)
	userId := claims.UserId
	return userId, ok
}
