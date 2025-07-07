package services

import (
	"ecommerce/backend/src/models"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupTestProductDB(t *testing.T) *gorm.DB {
	dsn := "host=localhost port=5432 user=username password=password dbname=ecommerce sslmode=disable TimeZone=Asia/Bangkok"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect to test db: %v", err)
	}
	if err := db.Exec("DROP TABLE IF EXISTS products CASCADE").Error; err != nil {
		t.Fatal(err)
	}
	db.AutoMigrate(&models.Product{})
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
		Category:    "TestCat",
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
