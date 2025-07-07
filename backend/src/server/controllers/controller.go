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
			product.GET("/", pc.GetAllProducts)
			product.GET("/:id", pc.GetProductByID)
			product.POST("/", pc.CreateProduct)
			product.PUT("/:id", pc.UpdateProduct)
			product.DELETE("/:id", pc.DeleteProduct)

		}

	}

}
