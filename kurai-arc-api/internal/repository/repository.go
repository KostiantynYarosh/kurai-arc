package repository

import (
	"fmt"
	"kurai-api/internal/config"
	"kurai-api/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func NewRepository(cfg *config.Config) (*Repository, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=UTC",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort, cfg.DBSSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return &Repository{DB: db}, nil
}

// Collections
func (r *Repository) GetAllCollections() ([]models.Collection, error) {
	var collections []models.Collection
	result := r.DB.Where("is_active = ?", true).Find(&collections)
	return collections, result.Error
}

// Products
func (r *Repository) GetAllProducts(collectionSlug string) ([]models.Product, error) {
	var products []models.Product
	query := r.DB.Preload("Images").Preload("Collection")

	if collectionSlug != "" {
		// Join with collections to filter by slug
		query = query.Joins("JOIN collections ON collections.id = products.collection_id").
			Where("collections.slug = ?", collectionSlug)
	}

	result := query.Find(&products)
	return products, result.Error
}

func (r *Repository) GetProductBySlug(slug string) (*models.Product, error) {
	var product models.Product
	result := r.DB.Preload("Images").Preload("Collection").Where("slug = ?", slug).First(&product)
	if result.Error != nil {
		return nil, result.Error
	}
	return &product, nil
}

// Orders
func (r *Repository) CreateOrder(order *models.Order) error {
	return r.DB.Transaction(func(tx *gorm.DB) error {
		// 1. Create the Order
		if err := tx.Create(order).Error; err != nil {
			return err
		}

		// 2. Decrement stock for each item
		for _, item := range order.Items {
			// Determine the column name based on size
			var column string
			switch item.Size {
			case "XS":
				column = "stock_xs"
			case "S":
				column = "stock_s"
			case "M":
				column = "stock_m"
			case "L":
				column = "stock_l"
			case "XL":
				column = "stock_xl"
			case "XXL":
				column = "stock_xxl"
			case "OS":
				column = "stock_os"
			default:
				// Skip if size is unknown (or handle error)
				continue
			}

			// Decrease stock, ensuring it doesn't go below 0
			// gorm.Expr creates a raw SQL expression
			result := tx.Model(&models.Product{}).
				Where("id = ? AND "+column+" >= ?", item.ProductID, item.Quantity).
				Update(column, gorm.Expr(column+" - ?", item.Quantity))

			if result.Error != nil {
				return result.Error
			}
			if result.RowsAffected == 0 {
				return fmt.Errorf("insufficient stock for product %d size %s", item.ProductID, item.Size)
			}
		}

		return nil
	})
}

func (r *Repository) CreateUser(user *models.User) error {
	return r.DB.Create(user).Error
}

func (r *Repository) FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	result := r.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}
