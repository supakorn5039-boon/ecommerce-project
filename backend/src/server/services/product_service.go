package services

import (
	"ecommerce/backend/src/database"
	"ecommerce/backend/src/models"

	"gorm.io/gorm"
)

type ProductService struct {
	db *gorm.DB
}

func NewProductService() *ProductService {
	return &ProductService{db: database.Db}
}

func (p *ProductService) CreateProduct(product *models.Product) (*models.ProductDto, error) {
	if err := p.db.Create(product).Error; err != nil {
		return nil, err
	}

	dto := product.ToDto()
	return &dto, nil
}

func (p *ProductService) GetProductById(id int) (*models.ProductDto, error) {
	var product models.Product
	if err := p.db.First(&product, id).Error; err != nil {
		return nil, err
	}

	dto := product.ToDto()
	return &dto, nil
}

func (p *ProductService) GetAllProducts() ([]*models.ProductDto, error) {
	var products []models.Product
	if err := p.db.Find(&products).Error; err != nil {
		return nil, err
	}

	result := make([]*models.ProductDto, len(products))
	for i, product := range products {
		dto := product.ToDto()
		result[i] = &dto
	}
	return result, nil
}

func (p *ProductService) UpdateProduct(id uint, product *models.Product) (*models.ProductDto, error) {
	var existing models.Product
	if err := p.db.First(&existing, id).Error; err != nil {
		return nil, err
	}

	if err := p.db.Model(&existing).Updates(product).Error; err != nil {
		return nil, err
	}

	dto := existing.ToDto()
	return &dto, nil
}

func (p *ProductService) DeleteProduct(id uint) error {
	if err := p.db.Delete(&models.Product{}, id).Error; err != nil {
		return err
	}
	return nil
}
