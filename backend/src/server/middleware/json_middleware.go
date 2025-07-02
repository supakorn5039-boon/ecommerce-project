package middleware

import (
	"ecommerce/backend/src/security"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func JSONContentType() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == http.MethodPost || c.Request.Method == http.MethodPut || c.Request.Method == http.MethodPatch {
			contentType := c.GetHeader("Content-Type")
			if !strings.HasPrefix(contentType, "application/json") {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Content-Type header must be set to application/json",
				})
			}
		}
		c.Next()
	}
}

func Protected() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization header is missing"})
			return
		}

		parts := strings.Split(authHeader, " ")

		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization header is invalid"})
			return
		}

		tokenStr := parts[1]

		token, err := security.ValidateToken(tokenStr)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error()})
			return
		}

		c.Set("user_id", token.Id)
		c.Next()

	}
}
