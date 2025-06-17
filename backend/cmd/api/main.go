package main

import (
	"github.com/gin-gonic/gin"
	"ecommerce/backend/infras"
	"ecommerce/backend/internal/entities"
	"ecommerce/backend/internal/routers"
)

func main() {
	db := infras.ConnectPostgres()

	r := gin.Default()
	routers.SetupRoutes(r, db)

	if err := db.AutoMigrate(&entities.User{}); err != nil {
		panic(err)
	}

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
