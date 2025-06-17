package user

import (
	"net/http"

	"ecommerce/backend/internal/usecases"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	uc usecases.UserUsecaseInterface
}

func NewUserHandler(uc usecases.UserUsecaseInterface) *UserHandler {
	return &UserHandler{uc}
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	users, err := h.uc.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}
