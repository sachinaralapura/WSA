package services

import (
	"fmt"
	"time"
	"todoserver/common"
	"todoserver/model"

	"github.com/golang-jwt/jwt/v5"
)

type Service interface {
	Serve()
}

type AuthService struct {
	*common.Config
}

func (a *AuthService) Serve() {}

// GenerateJWT generates a JWT token
// The token is signed with the private key
// The token contains the userId, role, name, email
// The token is valid for 24 hours
func (a *AuthService) GenerateJWT(userId, role, name, email string) (string, error) {
	privateKey := a.GetSignKey()
	claims := model.JWTClaims{
		UserId: userId,
		Role:   role,
		Name:   name,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "Sachin Aralapura",
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}
	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	// Sign the token with the RSA private key
	tokenString, err := token.SignedString(privateKey)
	if err != nil {
		return "", fmt.Errorf("could not sign token: %w", err)
	}
	return tokenString, nil
}

// VerifyJWT verifies the JWT token
func (a *AuthService) VerifyJWT(tokenString string) (*model.JWTClaims, error) {
	claims := &model.JWTClaims{}
	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return a.GetVerifyKey(), nil
	})
	if err != nil {
		return nil, fmt.Errorf("could not verify token: %w", err)
	}
	return claims, nil
}
