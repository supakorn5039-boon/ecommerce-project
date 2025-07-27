package services

import (
	"ecommerce/backend/src/database"
	"ecommerce/backend/src/models"

	"gorm.io/gorm"
)

type StockLogService struct {
	db *gorm.DB
}

func NewStockLogService() *StockLogService {
	return &StockLogService{db: database.Db}
}

func (s *StockLogService) SearchStockLogs(query string) ([]*models.StockDto, error) {
	var stockLogs []models.Stock

	queryPattern := "%" + query + "%"
	if err := s.db.Where("name ILIKE ?", queryPattern).Find(&stockLogs).Error; err != nil {
		return nil, err
	}

	result := make([]*models.StockDto, len(stockLogs))
	for i, stockLog := range stockLogs {
		dto := stockLog.ToDto()
		result[i] = &dto
	}
	return result, nil
}

func (s *StockLogService) GetAllStockLogs() ([]*models.StockDto, error) {
	var stockLogs []models.Stock
	if err := s.db.Order("date DESC").Find(&stockLogs).Error; err != nil {
		return nil, err
	}

	result := make([]*models.StockDto, len(stockLogs))
	for i, stockLog := range stockLogs {
		dto := stockLog.ToDto()
		result[i] = &dto
	}

	return result, nil

}
