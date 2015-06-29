package main

type Item struct {
	Id          int64  `form:"id" json:"id"`
	Title       string `form:"title" json:"title"`
	Description string `form:"description" json:"description"`
	UserName    string `form:"user_name" json:"user_name"`
}