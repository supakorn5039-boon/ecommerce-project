package user

import (
	"net/http"

	"ecommerce/backend/dto"
	"ecommerce/backend/internal/entities"
	"ecommerce/backend/internal/usecases"
	"ecommerce/backend/pkg/hash"
	"ecommerce/backend/pkg/jwt"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	uc usecases.UserUsecaseInterface
}

func NewUserHandler(uc usecases.UserUsecaseInterface) *UserHandler {
	return &UserHandler{uc}
}

func (h *UserHandler) Register(c *gin.Context) {
	var req dto.UserRegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := hash.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not hash password"})
		return
	}

	user := &entities.User{
		Username: req.Username,
		Password: hashedPassword,
		Email:    req.Email,
	}

	if err := h.uc.CreateUser(c.Request.Context(), user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not register user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "user registered successfully"})
}

func (h *UserHandler) Login(c *gin.Context) {
	var req dto.UserLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.uc.GetUserByUsername(c.Request.Context(), req.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if !hash.CheckPasswordHash(req.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, err := jwt.GenerateToken(user.ID, user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"username": user.Username,
		"token":    token,
	})
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	users, err := h.uc.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}
