package services

import (
	"ecommerce/backend/src/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestProductDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect to test db: %v", err)
	}

	err = db.AutoMigrate(&models.Product{})
	if err != nil {
		t.Fatalf("failed to migrate test db: %v", err)
	}

	return db
}

func TestProductService_CRUD(t *testing.T) {
	db := setupTestProductDB(t)
	service := &ProductService{db: db}

	// Create
	product := &models.Product{
		Name:        "Test Product",
		Description: "A test product",
		Price:       9.99,
		Stock:       10,
		Image:       "test.jpg",
		Category:    1,
	}
	created, err := service.CreateProduct(product)
	assert.NoError(t, err)
	assert.Equal(t, "Test Product", created.Name)

	// Get by ID
	got, err := service.GetProductById(int(product.ID))
	assert.NoError(t, err)
	assert.Equal(t, "Test Product", got.Name)

	// Get all
	products, err := service.GetAllProducts()
	assert.NoError(t, err)
	assert.Len(t, products, 1)

	// Update
	update := &models.Product{Description: "Updated desc", Price: 19.99}
	updated, err := service.UpdateProduct(product.ID, update)
	assert.NoError(t, err)
	assert.Equal(t, "Updated desc", updated.Description)
	assert.Equal(t, 19.99, updated.Price)

	// Delete
	err = service.DeleteProduct(product.ID)
	assert.NoError(t, err)
	products, err = service.GetAllProducts()
	assert.NoError(t, err)
	assert.Len(t, products, 0)
}
