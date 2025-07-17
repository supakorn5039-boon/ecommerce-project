package controllers

import "ecommerce/backend/src/server/services"

type StockController struct {
	service *services.StockSerive
}

func NewStockController(svc *services.StockSerive) *StockController {
	return &StockController{service: svc}
}
