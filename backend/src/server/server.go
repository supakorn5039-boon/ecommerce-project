package server

import (
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/server/controllers"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func WebServer(config models.ServerConfig) {
	if config.Production {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	applyCorsMiddleware(router)

	controllers.ApplyRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = fmt.Sprintf("%d", config.Port)
	}

	err := router.Run(":" + port)
	if err != nil {
		panic(err)
	}
}
