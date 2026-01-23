package handlers

import (
	"kurai-api/internal/models"
	"kurai-api/internal/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Repo *repository.Repository
}

func NewHandler(repo *repository.Repository) *Handler {
	return &Handler{Repo: repo}
}

// GetCollections - List all active collections
func (h *Handler) GetCollections(c *gin.Context) {
	collections, err := h.Repo.GetAllCollections()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch collections"})
		return
	}
	c.JSON(http.StatusOK, collections)
}

// GetProducts - List products, optionally filtered by collection slug
func (h *Handler) GetProducts(c *gin.Context) {
	collectionSlug := c.Query("collection")
	products, err := h.Repo.GetAllProducts(collectionSlug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}
	c.JSON(http.StatusOK, products)
}

// GetProductBySlug - Get single product details
func (h *Handler) GetProductBySlug(c *gin.Context) {
	slug := c.Param("slug")
	product, err := h.Repo.GetProductBySlug(slug)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}

// CreateOrderInput validation struct
type CreateOrderInput struct {
	User struct {
		FullName  string `json:"full_name" binding:"required"`
		Email     string `json:"email" binding:"required,email"`
		Phone     string `json:"phone"`
		Telegram  string `json:"telegram"`
		Instagram string `json:"instagram"`
		Address   string `json:"address"`
	} `json:"user" binding:"required"`
	Items []struct {
		ProductID uint    `json:"product_id" binding:"required"`
		Size      string  `json:"size" binding:"required"`
		Quantity  int     `json:"quantity" binding:"required,min=1"`
		Price     float64 `json:"price" binding:"required"` // Should ideally be fetched from DB to prevent tampering
	} `json:"items" binding:"required,dive"`
	TotalAmount     float64 `json:"total_amount" binding:"required"`
	ShippingAddress string  `json:"shipping_address" binding:"required"`
	PromoCode       string  `json:"promo_code"`
}

// CreateOrder - Create a new order
func (h *Handler) CreateOrder(c *gin.Context) {
	var input CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1. Create or Find User
	user, err := h.Repo.FindUserByEmail(input.User.Email)
	if err != nil {
		// User doesn't exist, create new
		user = &models.User{
			FullName:  input.User.FullName,
			Email:     input.User.Email,
			Phone:     input.User.Phone,
			Telegram:  input.User.Telegram,
			Instagram: input.User.Instagram,
			Address:   input.User.Address,
		}
		if err := h.Repo.CreateUser(user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}
	}

	// 2. Create Order
	order := models.Order{
		UserID:          user.ID,
		Status:          "pending",
		TotalAmount:     input.TotalAmount,
		PromoCode:       input.PromoCode,
		ShippingAddress: input.ShippingAddress,
		Items:           make([]models.OrderItem, len(input.Items)),
	}

	for i, item := range input.Items {
		order.Items[i] = models.OrderItem{
			ProductID:       item.ProductID,
			Size:            item.Size,
			Quantity:        item.Quantity,
			PriceAtPurchase: item.Price,
		}
	}

	if err := h.Repo.CreateOrder(&order); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Order created successfully", "order_id": order.ID})
}
