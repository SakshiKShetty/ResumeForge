package handlers

import (
	"context"
	"net/http"
	"time"

	"resume-builder/db"
	"resume-builder/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GET /api/resumes - list all resumes for current user
func ListResumes(c *gin.Context) {
	userID := c.GetString("userId")
	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	opts := options.Find().
		SetSort(bson.D{{Key: "updatedAt", Value: -1}}).
		SetProjection(bson.M{
			"_id": 1, "title": 1, "template": 1,
			"updatedAt": 1, "createdAt": 1, "lastSavedAt": 1,
			"data.personalInfo.fullName": 1,
		})

	cursor, err := col.Find(ctx, bson.M{"userId": objID}, opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch resumes"})
		return
	}
	defer cursor.Close(ctx)

	var resumes []models.Resume
	if err := cursor.All(ctx, &resumes); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode resumes"})
		return
	}

	if resumes == nil {
		resumes = []models.Resume{}
	}
	c.JSON(http.StatusOK, gin.H{"resumes": resumes})
}

// POST /api/resumes - create a new resume
func CreateResume(c *gin.Context) {
	userID := c.GetString("userId")
	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var req models.CreateResumeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.Template == "" {
		req.Template = "professional"
	}

	now := time.Now()
	resume := models.Resume{
		ID:          primitive.NewObjectID(),
		UserID:      objID,
		Title:       req.Title,
		Template:    req.Template,
		Data:        req.Data,
		LastSavedAt: now,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	// Ensure slices are non-nil
	if resume.Data.Experience == nil {
		resume.Data.Experience = []models.WorkExperience{}
	}
	if resume.Data.Education == nil {
		resume.Data.Education = []models.Education{}
	}
	if resume.Data.Skills == nil {
		resume.Data.Skills = []string{}
	}
	if resume.Data.Projects == nil {
		resume.Data.Projects = []models.Project{}
	}
	if resume.Data.Certifications == nil {
		resume.Data.Certifications = []models.Certification{}
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if _, err := col.InsertOne(ctx, resume); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create resume"})
		return
	}

	c.JSON(http.StatusCreated, resume)
}

// GET /api/resumes/:id - get single resume
func GetResume(c *gin.Context) {
	userID := c.GetString("userId")
	userObjID, _ := primitive.ObjectIDFromHex(userID)

	resumeID := c.Param("id")
	resumeObjID, err := primitive.ObjectIDFromHex(resumeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid resume ID"})
		return
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var resume models.Resume
	err = col.FindOne(ctx, bson.M{"_id": resumeObjID, "userId": userObjID}).Decode(&resume)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resume not found"})
		return
	}

	c.JSON(http.StatusOK, resume)
}

// PUT /api/resumes/:id - full update
func UpdateResume(c *gin.Context) {
	userID := c.GetString("userId")
	userObjID, _ := primitive.ObjectIDFromHex(userID)

	resumeID := c.Param("id")
	resumeObjID, err := primitive.ObjectIDFromHex(resumeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid resume ID"})
		return
	}

	var req models.UpdateResumeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	now := time.Now()
	update := bson.M{
		"$set": bson.M{
			"title":       req.Title,
			"template":    req.Template,
			"data":        req.Data,
			"lastSavedAt": now,
			"updatedAt":   now,
		},
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := col.UpdateOne(ctx, bson.M{"_id": resumeObjID, "userId": userObjID}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update resume"})
		return
	}
	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resume not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Resume saved", "lastSavedAt": now})
}

// PUT /api/resumes/:id/autosave - lightweight auto-save
func AutoSaveResume(c *gin.Context) {
	userID := c.GetString("userId")
	userObjID, _ := primitive.ObjectIDFromHex(userID)

	resumeID := c.Param("id")
	resumeObjID, err := primitive.ObjectIDFromHex(resumeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid resume ID"})
		return
	}

	var body struct {
		Data     models.ResumeData `json:"data"`
		Template string            `json:"template"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	now := time.Now()
	update := bson.M{
		"$set": bson.M{
			"data":        body.Data,
			"template":    body.Template,
			"lastSavedAt": now,
			"updatedAt":   now,
		},
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	result, err := col.UpdateOne(ctx, bson.M{"_id": resumeObjID, "userId": userObjID}, update)
	if err != nil || result.MatchedCount == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Auto-save failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"lastSavedAt": now})
}

// DELETE /api/resumes/:id
func DeleteResume(c *gin.Context) {
	userID := c.GetString("userId")
	userObjID, _ := primitive.ObjectIDFromHex(userID)

	resumeID := c.Param("id")
	resumeObjID, err := primitive.ObjectIDFromHex(resumeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid resume ID"})
		return
	}

	col := db.GetCollection("resumes")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := col.DeleteOne(ctx, bson.M{"_id": resumeObjID, "userId": userObjID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete resume"})
		return
	}
	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Resume not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Resume deleted"})
}
