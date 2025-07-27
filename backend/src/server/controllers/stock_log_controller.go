package controllers

import (
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/server/services"
	"ecommerce/backend/src/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type StockController struct {
	service *services.StockLogService
}

func NewStockLogController(s *services.StockLogService) *StockController {
	return &StockController{service: s}
}

func (s *StockController) getAllStockLogs(c *gin.Context) {
	query := c.Query("search")

	var stockLogs []*models.StockDto
	var err error

	if query != "" {
		stockLogs, err = s.service.SearchStockLogs(query)
	} else {
		stockLogs, err = s.service.GetAllStockLogs()
	}

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, stockLogs)
}
