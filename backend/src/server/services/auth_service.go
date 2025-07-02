package services

import (
	"ecommerce/backend/src/database"
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/security"
	"fmt"

	"gorm.io/gorm"
)

type AuthenticateService struct {
	db *gorm.DB
}

var testDB *gorm.DB

func SetTestDB(db *gorm.DB) {
	testDB = db
}

func NewAuthenticationService() *AuthenticateService {

	if testDB != nil {
		return &AuthenticateService{testDB}
	}

	return &AuthenticateService{db: database.Db}
}

func (s *AuthenticateService) Login(username, password string) (*models.UserDto, error) {
	var user models.User

	if err := s.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, fmt.Errorf("invalid username")
	}

	if ok := security.VerifyPassword(user.Password, password); !ok {
		return nil, fmt.Errorf("invalid password")
	}

	dto := user.ToDto()
	return &dto, nil
}

func (s *AuthenticateService) Register(username, password string) (*models.UserDto, error) {
	var existing models.User

	err := s.db.Model(&models.User{}).Where("username = ?", username).First(&existing).Error

	if err == nil {
		return nil, fmt.Errorf("username already exists")
	}

	newUser := models.User{
		Username: username,
		Password: password,
		Role:     "user",
	}

	if err := s.db.Create(&newUser).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}

	dto := newUser.ToDto()
	return &dto, nil

}
