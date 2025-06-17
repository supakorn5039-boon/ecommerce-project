package user

import (
	"ecommerce/backend/internal/entities"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserReposiroty(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetAllUsers() ([]entities.User, error) {
	var users []entities.User
	result := r.db.Find(&users)
	return users, result.Error
}
