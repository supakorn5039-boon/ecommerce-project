package user_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"ecommerce/backend/internal/adapters/user"
	"ecommerce/backend/internal/entities"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type mockUserUsecase struct{}

func (m *mockUserUsecase) GetAllUsers() ([]entities.User, error) {
	return []entities.User{
		{ID: 1, Username: "John Doe", Password: "password", Email: "john@example.com"},
	}, nil
}

func TestGetUsers(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.Default()
	mockUC := &mockUserUsecase{}
	handler := user.NewUserHandler(mockUC)

	router.GET("/api/users", handler.GetUsers)

	req, _ := http.NewRequest(http.MethodGet, "/api/users", nil)
	resp := httptest.NewRecorder()

	router.ServeHTTP(resp, req)

	assert.Equal(t, http.StatusOK, resp.Code)
	assert.Contains(t, resp.Body.String(), "John Doe")
}

func (m *mockUserUsecase) GetUserByUsername(ctx context.Context, username string) (*entities.User, error) {
	return &entities.User{
		ID:       1,
		Username: "John Doe",
		Password: "$2a$10$fakeHashedPassword",
	}, nil
}

func (m *mockUserUsecase) CreateUser(ctx context.Context, user *entities.User) error {
	return nil
}
