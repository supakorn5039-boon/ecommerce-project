package models

import "gorm.io/gorm"

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
