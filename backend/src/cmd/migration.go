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

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	err = db.Migrator().DropTable(&models.User{}, &models.Product{})
	if err != nil {
		log.Fatalf("failed to drop tables: %v", err)
	}

	if err = db.AutoMigrate(&models.User{}, &models.Product{}); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPassword("L64di")
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

	if err := db.Create(&mockupUser).Error; err != nil {
		log.Fatalf("failed to seed users: %v", err)
	}

	mockupProduct := []models.Product{
		{
			Name:        "Product 1",
			Description: "Description 1",
			Price:       100.00,
			Stock:       10,
			Image:       "https://example.com/image1.jpg",
			Category:    "Category 1",
		},
	}

	if err := db.Create(&mockupProduct).Error; err != nil {
		log.Fatalf("failed to seed products: %v", err)
	}

	log.Println("Database seeding completed successfully!")
}
