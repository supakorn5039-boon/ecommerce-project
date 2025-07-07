package controllers

import (
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/security"
	"ecommerce/backend/src/server/services"
	"ecommerce/backend/src/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func login(c *gin.Context) {
	var body models.CredentialRequest

	if err := c.ShouldBind(&body); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	authService := services.NewAuthenticationService()
	user, err := authService.Login(body.Username, body.Password)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"user": user, "token": token,
	})

}

func register(c *gin.Context) {
	var body models.CredentialRequest

	if err := c.ShouldBind(&body); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	hashedPassword, err := security.HashPassword(body.Password)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	authService := services.NewAuthenticationService()
	user, err := authService.Register(body.Username, hashedPassword)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	c.AbortWithStatusJSON(http.StatusCreated, gin.H{
		"user": user, "token": token,
	})
}
