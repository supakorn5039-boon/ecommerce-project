package models

type UserDto struct {
	Id       uint   `json:"-"`
	Username string `json:"username"`
	Password string `json:"-"`
	Role     string `json:"role"`
}

func (u *User) ToDto() UserDto {
	return UserDto{
		Id:       u.ID,
		Username: u.Username,
		Password: u.Password,
		Role:     u.Role,
	}
}
