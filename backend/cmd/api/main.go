package main

import (
	"ecommerce/backend/infras"
	"ecommerce/backend/internal/entities"
	"ecommerce/backend/internal/routers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := infras.ConnectPostgres()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routers.SetupRoutes(r, db)

	if err := db.AutoMigrate(&entities.User{}); err != nil {
		panic(err)
	}

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
