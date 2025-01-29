package main

import (
	"database/sql"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your_secret_key")

func hashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func comparePasswords(hashedPwd string, plainPwd string) bool {

	byteHash := []byte(hashedPwd)
	bytePlainPwd := []byte(plainPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, bytePlainPwd)
	if err != nil {
		return false
	}

	return true
}

func AuthenthicateUser(username string, password string, db *sql.DB) (bool, string, error) {
	var hashedPassword, userid string
	err := db.QueryRow(`SELECT user_id, password_hash FROM "Users" WHERE username = $1`, username).Scan(&userid, &hashedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			// User not found
			return false, "", err
		}
		return false, "", err
	}

	return comparePasswords(hashedPassword, password), userid, nil
}

func GenerateJWT(userid string, db *sql.DB) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid": userid,
		"exp":    time.Now().Add(time.Minute * 15).Unix(),
	})

	return token.SignedString(jwtSecret)
}

func ValidateJWT(tokenString string) (bool, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil {
		return false, err
	}

	return token.Valid, nil
}

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		valid, err := ValidateJWT(token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to validate token"})
			c.Abort()
			return
		}
		if token == "" || !valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
			c.Abort()
			return
		}

		c.Next()

	}

	/*return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		isValid, err := ValidateJWT(tokenString)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		if !isValid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})*/
}
