package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/gin-gonic/gin"
)


type BlogService struct {
}

func (s *BlogService) Run() {
	sqlConnection = Cfg["DB_USER"] + ":" + Cfg["DB_PASSWORD"] + "@tcp(" + Cfg["DB_HOST"] + ":" + Cfg["DB_PORT"] + ")/" + Cfg["DB_NAME"] + "?parseTime=true"

	db, err := gorm.Open("mysql", sqlConnection)
	PanicIf(err)

	//db.LogMode(true)
	db.AutoMigrate(&Post{}, &User{})

	postResource := postResource{db: db}
	userResource := userResource{db: db}

	r := gin.Default()

	apiv1 := r.Group("/api/v1")
	{
		apiv1.GET("/posts", postResource.GetPosts)
		apiv1.GET("/post/:id", postResource.GetPost)
		apiv1.POST("/post", postResource.CreatePost)
		apiv1.PUT("/post/:id", postResource.UpdatePost)
		apiv1.DELETE("/post/:id", postResource.DeletePost)

		apiv1.POST("/user/login", userResource.Login)
		apiv1.GET("/user/:login", userResource.GetUser)
		apiv1.POST("/user", userResource.CreateUser)
		apiv1.PUT("/user/:login", userResource.UpdateUser)
	}

	r.StaticFile("/", "./public/index.html")
	r.Static("/public/", "./public/")

	r.Run(":" + Cfg["PORT"])
	fmt.Println("Testing")
}
