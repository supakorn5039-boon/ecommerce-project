package app

import (
	"ecommerce/backend/src/database"
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/server"
)

type App struct {
	config *models.Config
}

func NewApp(config *models.Config) *App {
	app := &App{config: config}
	database.Init(&config.Database)
	return app
}

func (a *App) WebServer() {
	server.WebServer(models.ServerConfig{Port: a.config.Server.Port})
}
