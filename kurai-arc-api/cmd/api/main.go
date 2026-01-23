package main

import (
	"kurai-api/internal/config"
	"kurai-api/internal/handlers"
	"kurai-api/internal/models"
	"kurai-api/internal/repository"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Load Config
	cfg := config.LoadConfig()

	// 2. Initialize Database
	repo, err := repository.NewRepository(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto Migrate (Optional: Create tables if they don't exist)
	// In production, use a migration tool. For dev, this is convenient.
	// Disable foreign key constraint checks if needed, but better to fix models.
	// repo.DB.AutoMigrate(&models.User{}, &models.Collection{}, &models.Product{}, &models.ProductImage{}, &models.Order{}, &models.OrderItem{})
	// Note: We already have a schema.sql, so maybe skip AutoMigrate or ensure it matches.
	// Let's run it to be safe, assuming models match schema.
	if err := repo.DB.AutoMigrate(
		&models.User{},
		&models.Collection{},
		&models.Product{},
		&models.ProductImage{},
		&models.Order{},
		&models.OrderItem{},
	); err != nil {
		log.Printf("Warning: AutoMigrate failed: %v", err)
	}

	// 3. Initialize Handlers
	h := handlers.NewHandler(repo)

	// 4. Setup Router
	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := r.Group("/api")
	{
		api.GET("/collections", h.GetCollections)
		api.GET("/products", h.GetProducts)
		api.GET("/products/:slug", h.GetProductBySlug)
		api.POST("/orders", h.CreateOrder)
	}

	// 5. Run Server
	log.Printf("Server starting on port 8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
