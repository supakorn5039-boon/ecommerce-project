package main

import (
	"ecommerce/backend/src/config"
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/security"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load("config.ini"); err != nil {
		panic(err)
	}

	host := appConfig.Config.Database.Host
	port := appConfig.Config.Database.Port
	user := appConfig.Config.Database.User
	password := appConfig.Config.Database.Password
	dbName := appConfig.Config.Database.Name

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable TimeZone=Asia/Bangkok", host, port, user, password, dbName)

	var err error

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	err = db.Migrator().DropTable(&models.User{})
	if err != nil {
		log.Fatalf("failed to drop table: %v", err)
	}

	if err = db.AutoMigrate(&models.User{}); err != nil {
		log.Fatalf("failed to migrate table: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPassword("password")
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	mockupUser := []models.User{
		{
			Username: "username",
			Password: hashedPassword,
			Role:     "admin",
		},
	}

	db.Create(&mockupUser)

	log.Println("Database seeding completed successfully!")

}
