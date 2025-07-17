package services

import (
	"ecommerce/backend/src/database"

	"gorm.io/gorm"
)

type StockSerive struct {
	db *gorm.DB
}

func NewStockService() *StockSerive {
	return &StockSerive{db: database.Db}
}
