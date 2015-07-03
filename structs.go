package main

type Item struct {
	Id          int64  `form:"id" json:"id"`
	Title       string `form:"title" json:"title"`
	Description string `form:"description" json:"description"`
	UserName    string `form:"user_name" json:"user_name"`
}

type User struct {
	Id       int64  `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}