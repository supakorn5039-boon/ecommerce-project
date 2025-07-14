package controllers

import (
	"ecommerce/backend/src/server/middleware"
	"ecommerce/backend/src/server/services"

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

		product := api.Group("/product")
		product.Use(middleware.Protected())
		pc := &ProductController{service: services.NewProductService()}
		{
			product.GET("", pc.getAllProducts)
			product.GET("/:id", pc.getProductByID)
			product.POST("", pc.createProduct)
			product.PUT("/:id", pc.updateProduct)
			product.DELETE("/:id", pc.deleteProduct)

		}

	}

}
