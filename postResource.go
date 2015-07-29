package main

import (
	"time"
	"strconv"
	"github.com/jinzhu/gorm"
	"github.com/gin-gonic/gin"
)

type postResource struct {
	db gorm.DB
}

func (p *postResource) GetPosts(c *gin.Context) {
	var posts []Post

	p.db.Offset(0).Limit(Cfg["ITEM_PER_PAGE"]).Find(&posts)

	c.JSON(200, posts)
}

func (p *postResource) GetPost(c *gin.Context) {
	var post Post
	id, err := p.getId(c)
	if err != nil {
		c.JSON(400, NewError("problem decoding id"))
		return
	}

	if p.db.First(&post, id).RecordNotFound() {
		c.JSON(404, NewError("Record not found"))
	} else {
		c.JSON(200, post)
	}
}

func (p *postResource) CreatePost(c *gin.Context) {
	var post Post

	err := c.Bind(&post)
	if err != nil {
		c.JSON(400, NewError("problem decoding body"))
		return
	}

	post.Status = 1
	post.Created = time.Now()

	p.db.Save(&post)
}

func (p *postResource) UpdatePost(c *gin.Context) {
	id, errid := p.getId(c)
	if errid != nil {
		c.JSON(400, NewError("problem decoding id"))
		return
	}

	var post Post

	err := c.Bind(&post)
	if err != nil {
		c.JSON(400, NewError("problem decoding body"))
		return
	}

	post.Id = int32(id)

	var existing Post

	if p.db.First(&existing, id).RecordNotFound() {
		c.JSON(404, NewError("Record not found"))
		return
	} else {
		post.Created = existing.Created
		post.Status = existing.Status
		p.db.Save(&post)
	}
}

func (p *postResource) DeletePost(c *gin.Context) {
	id, errid := p.getId(c)
	if errid != nil {
		c.JSON(400, NewError("problem decoding id"))
		return
	}

	var post Post

	if p.db.First(&post, id).RecordNotFound() {
		c.JSON(404, NewError("Record not found"))
		return
	} else {
		p.db.Delete(&post)
	}
}

func (p *postResource) getId (c *gin.Context) (int32, error) {
	idStr := c.Params.ByName("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, err
	}
	return int32(id), nil
}

