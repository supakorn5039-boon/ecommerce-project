package server

import (
	"ecommerce/backend/src/models"

	"ecommerce/backend/src/server/controllers"
	"fmt"

	"github.com/gin-gonic/gin"
)

func WebServer(config models.ServerConfig) {

	if config.Production {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	applyCorsMiddleware(router)

	controllers.ApplyRoutes(router)

	err := router.Run(fmt.Sprintf(":%d", config.Port))
	if err != nil {
		panic(err)
	}

}
