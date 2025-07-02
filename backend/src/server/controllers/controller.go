package controllers

import (
	"ecommerce/backend/src/server/middleware"

	"github.com/gin-gonic/gin"
)

func ApplyRoutes(router *gin.Engine) {

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello world",
		})
	})

	api := router.Group("/api")

	api.Use(middleware.JSONContentType())
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", login)
			auth.POST("/register", register)
		}

	}

}
