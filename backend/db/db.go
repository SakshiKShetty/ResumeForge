package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var database *mongo.Database

func Connect(ctx context.Context, uri string) error {
	clientOptions := options.Client().ApplyURI(uri).
		SetConnectTimeout(10 * time.Second).
		SetServerSelectionTimeout(10 * time.Second)

	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		return err
	}

	// Ping to verify connection
	if err = client.Ping(ctx, nil); err != nil {
		return err
	}

	database = client.Database("resume_builder")
	log.Println("✅ MongoDB connected to database: resume_builder")

	// Create indexes
	createIndexes()
	return nil
}

func Disconnect() {
	if client != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		}
	}
}

func GetDB() *mongo.Database {
	return database
}

func GetCollection(name string) *mongo.Collection {
	return database.Collection(name)
}

func createIndexes() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Users collection: unique email index
	usersCol := GetCollection("users")
	_, err := usersCol.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys:    map[string]interface{}{"email": 1},
		Options: options.Index().SetUnique(true),
	})
	if err != nil {
		log.Printf("Warning: could not create email index: %v", err)
	}

	// Resumes collection: index on userId for fast lookup
	resumesCol := GetCollection("resumes")
	_, err = resumesCol.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: map[string]interface{}{"userId": 1, "updatedAt": -1},
	})
	if err != nil {
		log.Printf("Warning: could not create resume index: %v", err)
	}

	log.Println("✅ MongoDB indexes created")
}
