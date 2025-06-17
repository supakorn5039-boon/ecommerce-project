package entities

type User struct {
	ID       uint   `gorm:"primarykey" json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}
