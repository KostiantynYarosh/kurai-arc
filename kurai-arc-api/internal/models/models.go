package models

import (
	"time"
)

// User represents the users table
type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	FullName  string    `gorm:"not null" json:"full_name"`
	Email     string    `gorm:"not null" json:"email"`
	Phone     string    `json:"phone"`
	Telegram  string    `json:"telegram"`
	Instagram string    `json:"instagram"`
	Address   string    `json:"address"`
	CreatedAt time.Time `json:"created_at"`
}

// Collection represents the collections table
type Collection struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"not null" json:"name"`
	Slug        string    `gorm:"unique;not null" json:"slug"`
	Description string    `json:"description"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
}

// Product represents the products table
type Product struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	CollectionID uint      `json:"collection_id"`
	Collection   Collection `gorm:"foreignKey:CollectionID" json:"collection,omitempty"`
	Name         string    `gorm:"not null" json:"name"`
	Slug         string    `gorm:"unique;not null" json:"slug"`
	Type         string    `json:"type"`
	Description  string    `json:"description"`
	BasePrice    float64   `gorm:"not null" json:"base_price"`
	Status       string    `gorm:"default:'soon'" json:"status"`
	
	// Stock Levels
	StockXS  int `gorm:"default:0" json:"stock_xs"`
	StockS   int `gorm:"default:0" json:"stock_s"`
	StockM   int `gorm:"default:0" json:"stock_m"`
	StockL   int `gorm:"default:0" json:"stock_l"`
	StockXL  int `gorm:"default:0" json:"stock_xl"`
	StockXXL int `gorm:"default:0" json:"stock_xxl"`
	StockOS  int `gorm:"default:0" json:"stock_os"`

	CreatedAt time.Time      `json:"created_at"`
	Images    []ProductImage `gorm:"foreignKey:ProductID" json:"images,omitempty"`
}

// ProductImage represents the product_images table
type ProductImage struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	ProductID    uint   `json:"product_id"`
	URL          string `gorm:"not null" json:"url"`
	DisplayOrder int    `gorm:"default:1" json:"display_order"`
}

// Order represents the orders table
type Order struct {
	ID              uint        `gorm:"primaryKey" json:"id"`
	UserID          uint        `json:"user_id"`
	User            User        `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Status          string      `gorm:"default:'pending'" json:"status"`
	TotalAmount     float64     `gorm:"not null" json:"total_amount"`
	PromoCode       string      `json:"promo_code"`
	ShippingAddress string      `gorm:"not null" json:"shipping_address"`
	CreatedAt       time.Time   `json:"created_at"`
	Items           []OrderItem `gorm:"foreignKey:OrderID" json:"items,omitempty"`
}

// OrderItem represents the order_items table
type OrderItem struct {
	ID              uint    `gorm:"primaryKey" json:"id"`
	OrderID         uint    `json:"order_id"`
	ProductID       uint    `json:"product_id"`
	Product         Product `gorm:"foreignKey:ProductID" json:"product,omitempty"`
	Size            string  `gorm:"not null" json:"size"`
	Quantity        int     `gorm:"not null" json:"quantity"`
	PriceAtPurchase float64 `gorm:"not null" json:"price_at_purchase"`
}
