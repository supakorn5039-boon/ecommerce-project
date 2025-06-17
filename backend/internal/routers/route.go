package routers

import (
	"ecommerce/backend/internal/adapters/user"
	"ecommerce/backend/internal/usecases"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	userRepo := user.NewUserReposiroty(db)
	userUsecase := usecases.NewUserUsecase(userRepo)
	userHandler := user.NewUserHandler(userUsecase)

	api := r.Group("/api")
	{
		api.GET("/users", userHandler.GetUsers)
	}

}
