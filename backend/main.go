package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"resume-builder/handlers"
	"resume-builder/middleware"
	"resume-builder/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Connect to MongoDB
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := db.Connect(ctx, mongoURI); err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer db.Disconnect()

	log.Println("✅ Connected to MongoDB")

	// Setup Gin
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "timestamp": time.Now()})
	})

	// Auth routes (public)
	auth := r.Group("/api/auth")
	{
		auth.POST("/register", handlers.Register)
		auth.POST("/login", handlers.Login)
		auth.POST("/refresh", handlers.RefreshToken)
	}

	// Protected routes
	api := r.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		// User profile
		api.GET("/me", handlers.GetMe)
		api.PUT("/me", handlers.UpdateMe)

		// Resume CRUD
		api.GET("/resumes", handlers.ListResumes)
		api.POST("/resumes", handlers.CreateResume)
		api.GET("/resumes/:id", handlers.GetResume)
		api.PUT("/resumes/:id", handlers.UpdateResume)
		api.DELETE("/resumes/:id", handlers.DeleteResume)

		// Auto-save (debounced in frontend, but still separate endpoint)
		api.PUT("/resumes/:id/autosave", handlers.AutoSaveResume)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
