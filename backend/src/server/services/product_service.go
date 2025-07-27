package services

import (
	"ecommerce/backend/src/database"
	"ecommerce/backend/src/models"
	"fmt"

	"gorm.io/gorm"
)

type ProductService struct {
	db *gorm.DB
}

func NewProductService() *ProductService {
	return &ProductService{db: database.Db}
}

func (p *ProductService) SearchProducts(query string) ([]*models.ProductDto, error) {
	var products []models.Product

	queryPattern := "%" + query + "%"
	if err := p.db.Where("name ILIKE ?", queryPattern).Find(&products).Error; err != nil {
		return nil, err
	}

	result := make([]*models.ProductDto, len(products))
	for i, product := range products {
		dto := product.ToDto()
		result[i] = &dto
	}
	return result, nil
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

func (p *ProductService) CheckoutProducts(items []models.CheckoutProduct) error {

	var ids []uint
	for _, item := range items {
		ids = append(ids, item.ID)
	}

	var products []models.Product
	if err := p.db.Where("id IN ?", ids).Find(&products).Error; err != nil {
		return err
	}

	productMap := make(map[uint]models.Product)
	for _, product := range products {
		productMap[product.ID] = product
	}

	for _, item := range items {
		product, exists := productMap[item.ID]
		if !exists {
			return fmt.Errorf("product ID %d not found", item.ID)
		}

		if item.Quantity <= 0 {
			return fmt.Errorf("invalid quantity for product ID %d", item.ID)
		}

		if product.Stock < item.Quantity {
			return fmt.Errorf("not enough stock for product %s (available: %d, requested: %d)",
				product.Name, product.Stock, item.Quantity)
		}

		product.Stock -= item.Quantity

		if err := p.db.Save(&product).Error; err != nil {
			return err
		}

		stockLogs := models.Stock{
			Name:     product.Name,
			Quantity: item.Quantity,
			Price:    product.Price,
			Category: product.Category,
			Date:     product.UpdatedAt,
		}

		if err := p.db.Create(&stockLogs).Error; err != nil {
			return err
		}

	}

	return nil
}
