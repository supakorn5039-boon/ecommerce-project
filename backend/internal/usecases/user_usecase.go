package usecases

import "ecommerce/backend/internal/entities"

type UserRepo interface {
	GetAllUsers() ([]entities.User, error)
}

type UserUsecaseInterface interface {
	GetAllUsers() ([]entities.User, error)
}

type UserUsecase struct {
	repo UserRepo
}

func NewUserUsecase(r UserRepo) *UserUsecase {
	return &UserUsecase{r}
}

func (u *UserUsecase) GetAllUsers() ([]entities.User, error) {
	return u.repo.GetAllUsers()
}
