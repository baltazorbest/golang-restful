package main

import (
	"time"
)


type Post struct {
	Id          int32     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Created     time.Time `json:"created"`
	Status      uint8     `json:"-"`
	AuthorID    string    `json:"author_id"`
}

type User struct {
	Id       int64     `json:"id"`
	Name     string    `json:"name"`
	Login    string    `json:"login"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
	Created  time.Time `json:"created"`
	Status   uint8     `json:"-"`
}

type Error struct {
	Error string `json:"error"`
}