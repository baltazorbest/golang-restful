package main

import (
	"os"
	"log"
	"bufio"
	"strings"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/binding"
)

const CONFIG_FILE  = "config.txt"

var (
	sqlConnection string
	Cfg map[string]string = ReadFile(CONFIG_FILE)
)

func ReadFile (filename string) map[string]string {
	conf := make(map[string]string)

	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := strings.Split(scanner.Text(), "=")
		conf[line[0]] = line[1]
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return conf
}


func main() {

	m := martini.Classic()

	m.Use(render.Renderer())
	m.Use(DB())

	m.Group("/api/v1", func (r martini.Router) {
		r.Get("/items", GetItems)

		r.Get("/item/:id", GetItem)
		r.Post("/item", binding.Bind(Item{}), CreateItem)
		r.Put("/item/:id", binding.Bind(Item{}), UpdateItem)
		r.Delete("/item/:id", DeleteItem)

		r.Post("/login", binding.Bind(User{}), Login)
		r.Get("/user/:username", GetUser)
		r.Post("/user", binding.Bind(User{}), Signup)
		r.Put("/user/:username", binding.Bind(User{}), EditUser)
	})

	m.RunOnAddr(":" + Cfg["PORT"])

}


