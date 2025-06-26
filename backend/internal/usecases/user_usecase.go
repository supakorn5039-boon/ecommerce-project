package usecases

import (
	"context"
	"ecommerce/backend/internal/entities"
)

type UserRepo interface {
	GetAllUsers() ([]entities.User, error)
	Create(ctx context.Context, user *entities.User) error
	GetUserByUsername(ctx context.Context, username string) (*entities.User, error)
}

type UserUsecaseInterface interface {
	GetAllUsers() ([]entities.User, error)
	CreateUser(ctx context.Context, user *entities.User) error
	GetUserByUsername(ctx context.Context, username string) (*entities.User, error)
}

type UserUsecase struct {
	repo UserRepo
}

func (u *UserUsecase) CreateUser(ctx context.Context, user *entities.User) error {
	return u.repo.Create(ctx, user)
}

func NewUserUsecase(r UserRepo) *UserUsecase {
	return &UserUsecase{r}
}

func (u *UserUsecase) GetAllUsers() ([]entities.User, error) {
	return u.repo.GetAllUsers()
}

func (u *UserUsecase) GetUserByUsername(ctx context.Context, username string) (*entities.User, error) {
	return u.repo.GetUserByUsername(ctx, username)
}
