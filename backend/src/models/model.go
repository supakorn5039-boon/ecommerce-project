package models

import (
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
	Id          int     `gorm:"not null"`
	Name        string  `gorm:"not null"`
	Description string  `gorm:"not null"`
	Price       float64 `gorm:"not null"`
	Stock       int     `gorm:"not null"`
	Image       string  `gorm:"not null"`
	Category    int     `gorm:"not null"`
}
