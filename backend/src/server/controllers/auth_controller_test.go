package controllers

import (
	"bytes"
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/security"
	"ecommerce/backend/src/server/services"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	dsn := "host=localhost port=5432 user=username password=password dbname=ecommerce sslmode=disable TimeZone=Asia/Bangkok"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to test database")
	}
	db.Exec("DROP TABLE IF EXISTS users CASCADE")
	if err := db.AutoMigrate(&models.User{}); err != nil {
		panic("failed to migrate test database")
	}
	services.SetTestDB(db)
	return db
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.POST("/api/auth/register", register)
	r.POST("/api/auth/login", login)
	return r
}

func TestRegister(t *testing.T) {
	setupTestDB()
	r := setupRouter()

	payload := models.CredentialRequest{
		Username: "testuser",
		Password: "testpassword",
	}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "/api/auth/register", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()

	r.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusCreated, resp.Code)

	var jsonResponse map[string]interface{}
	json.Unmarshal(resp.Body.Bytes(), &jsonResponse)

	assert.NotNil(t, jsonResponse["user"])
	assert.NotNil(t, jsonResponse["token"])
}

func TestLogin(t *testing.T) {
	db := setupTestDB()
	r := setupRouter()

	password, _ := security.HashPassword("testpassword")
	db.Create(&models.User{
		Username: "testuser",
		Password: password,
	})

	payload := models.CredentialRequest{
		Username: "testuser",
		Password: "testpassword",
	}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "/api/auth/login", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	resp := httptest.NewRecorder()

	r.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)

	var jsonResponse map[string]interface{}
	json.Unmarshal(resp.Body.Bytes(), &jsonResponse)

	assert.NotNil(t, jsonResponse["user"])
	assert.NotNil(t, jsonResponse["token"])
}
