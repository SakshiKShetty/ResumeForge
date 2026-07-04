package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ──────────────────────────────────────────────
// User
// ──────────────────────────────────────────────

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      string             `bson:"name" json:"name" binding:"required"`
	Email     string             `bson:"email" json:"email" binding:"required,email"`
	Password  string             `bson:"password" json:"-"` // never expose hash
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type RegisterRequest struct {
	Name     string `json:"name" binding:"required,min=2"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
	User         UserDTO `json:"user"`
}

type UserDTO struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// ──────────────────────────────────────────────
// Resume Data Structures (mirrors TypeScript types)
// ──────────────────────────────────────────────

type PersonalInfo struct {
	FullName  string `bson:"fullName" json:"fullName"`
	Email     string `bson:"email" json:"email"`
	Phone     string `bson:"phone" json:"phone"`
	Address   string `bson:"address" json:"address"`
	LinkedIn  string `bson:"linkedin" json:"linkedin"`
	Portfolio string `bson:"portfolio" json:"portfolio"`
}

type WorkExperience struct {
	ID          string `bson:"id" json:"id"`
	JobTitle    string `bson:"jobTitle" json:"jobTitle"`
	Company     string `bson:"company" json:"company"`
	StartDate   string `bson:"startDate" json:"startDate"`
	EndDate     string `bson:"endDate" json:"endDate"`
	Description string `bson:"description" json:"description"`
}

type Education struct {
	ID          string `bson:"id" json:"id"`
	Degree      string `bson:"degree" json:"degree"`
	Institution string `bson:"institution" json:"institution"`
	Year        string `bson:"year" json:"year"`
}

type Project struct {
	ID          string `bson:"id" json:"id"`
	Name        string `bson:"name" json:"name"`
	Description string `bson:"description" json:"description"`
	Link        string `bson:"link" json:"link"`
}

type Certification struct {
	ID     string `bson:"id" json:"id"`
	Name   string `bson:"name" json:"name"`
	Issuer string `bson:"issuer" json:"issuer"`
	Year   string `bson:"year" json:"year"`
}

type ResumeData struct {
	PersonalInfo   PersonalInfo     `bson:"personalInfo" json:"personalInfo"`
	Summary        string           `bson:"summary" json:"summary"`
	Experience     []WorkExperience `bson:"experience" json:"experience"`
	Education      []Education      `bson:"education" json:"education"`
	Skills         []string         `bson:"skills" json:"skills"`
	Projects       []Project        `bson:"projects" json:"projects"`
	Certifications []Certification  `bson:"certifications" json:"certifications"`
}

// ──────────────────────────────────────────────
// Resume Document
// ──────────────────────────────────────────────

type Resume struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID       primitive.ObjectID `bson:"userId" json:"userId"`
	Title        string             `bson:"title" json:"title"`
	Template     string             `bson:"template" json:"template"`
	Data         ResumeData         `bson:"data" json:"data"`
	LastSavedAt  time.Time          `bson:"lastSavedAt" json:"lastSavedAt"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt    time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type CreateResumeRequest struct {
	Title    string     `json:"title" binding:"required"`
	Template string     `json:"template"`
	Data     ResumeData `json:"data"`
}

type UpdateResumeRequest struct {
	Title    string     `json:"title"`
	Template string     `json:"template"`
	Data     ResumeData `json:"data"`
}
