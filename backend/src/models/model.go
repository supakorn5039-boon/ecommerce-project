package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Role     string `gorm:"not null"`
	Username string `gorm:"not null"`
	Password string `gorm:"not null"`
}

type CredentialRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Product struct {
	gorm.Model
	Name        string  `gorm:"not null"`
	Description string  `gorm:"not null"`
	Price       float64 `gorm:"not null"`
	Stock       int     `gorm:"not null"`
	Image       string  `gorm:"not null"`
	Category    int     `gorm:"not null"`
}

type Stock struct {
	gorm.Model
	ProductID uint      `json:"product_id"`
	Quantity  int       `json:"quantity"`
	Total     int       `json:"total"`
	CreatedAt time.Time `json:"created_at"`
}
