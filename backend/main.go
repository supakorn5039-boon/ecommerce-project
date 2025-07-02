package main

import (
	"ecommerce/backend/src/app"
	"ecommerce/backend/src/config"
	"log"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load("config.ini"); err != nil {
		log.Fatal(err)
	}

	a := app.NewApp(appConfig.Config)
	a.WebServer()

}
