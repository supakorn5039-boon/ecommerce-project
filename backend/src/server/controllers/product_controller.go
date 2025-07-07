package controllers

import (
	"ecommerce/backend/src/models"
	"ecommerce/backend/src/server/services"
	"ecommerce/backend/src/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
	service *services.ProductService
}

func NewProductController(svc *services.ProductService) *ProductController {
	return &ProductController{service: svc}
}

func (pc *ProductController) GetAllProducts(c *gin.Context) {
	products, err := pc.service.GetAllProducts()
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.SuccessResponse(c, products)
}

func (pc *ProductController) GetProductByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.ErrorResponse(c, "Invalid product ID", http.StatusBadRequest)
		return
	}

	product, err := pc.service.GetProductById(id)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusNotFound)
		return
	}
	utils.SuccessResponse(c, product)
}

func (pc *ProductController) CreateProduct(c *gin.Context) {
	var input models.Product
	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := pc.service.CreateProduct(&input)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.SuccessResponse(c, product)
}

func (pc *ProductController) UpdateProduct(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.ErrorResponse(c, "Invalid product ID", http.StatusBadRequest)
		return
	}

	var input models.Product
	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := pc.service.UpdateProduct(uint(id), &input)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.SuccessResponse(c, product)
}

func (pc *ProductController) DeleteProduct(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.ErrorResponse(c, "Invalid product ID", http.StatusBadRequest)
		return
	}

	if err := pc.service.DeleteProduct(uint(id)); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}
	utils.SuccessResponse(c, gin.H{"message": "Product deleted successfully"})
}
