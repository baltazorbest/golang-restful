package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/binding"
)

var (
	sqlConnection string
)


func main() {

	m := martini.Classic()

	m.Use(render.Renderer())
	m.Use(DB())

	m.Get("/", GetItems)
	m.Get("/:id", GetItem)
	m.Post("/", binding.Bind(Item{}), CreateItem)
	m.Put("/:id", binding.Bind(Item{}), UpdateItem)

	m.Delete("/:id", DeleteItem)

	m.RunOnAddr(":8888")

}


