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

	m.Group("/api/v1", func (r martini.Router) {
		r.Get("/items/", GetItems)
		r.Get("/item/:id", GetItem)
		r.Post("/item/", binding.Bind(Item{}), CreateItem)
		r.Put("/item/:id", binding.Bind(Item{}), UpdateItem)
		r.Delete("/item/:id", DeleteItem)
	})

	m.RunOnAddr(":8888")

}


