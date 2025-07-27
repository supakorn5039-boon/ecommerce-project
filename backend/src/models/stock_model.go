package models

import "time"

type StockDto struct {
	Id       uint      `json:"id"`
	Name     string    `json:"name"`
	Quantity int       `json:"quantity"`
	Price    float64   `json:"price"`
	Category int       `json:"category"`
	Date     time.Time `json:"date"`
}

func (s *Stock) ToDto() StockDto {
	return StockDto{
		Id:       s.ID,
		Name:     s.Name,
		Quantity: s.Quantity,
		Price:    s.Price,
		Category: s.Category,
		Date:     s.CreatedAt,
	}
}
