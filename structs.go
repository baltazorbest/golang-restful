package main

type Item struct {
	Id          int64  `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	UserName    string `json:"user_name"`
}

type User struct {
	Id       int64  `json:"id"`
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Active   uint8  `json:"-"`
}
