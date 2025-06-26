package user

import (
	"context"
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

func (r *UserRepository) Create(ctx context.Context, user *entities.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) GetUserByUsername(ctx context.Context, username string) (*entities.User, error) {
	var user entities.User
	err := r.db.WithContext(ctx).Where("username = ?", username).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
