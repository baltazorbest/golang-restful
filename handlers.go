package main

import (
	"net/http"
	"encoding/json"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/go-martini/martini"
)

const ITEM_PER_PAGE int  = 10

func DB() martini.Handler {
	sqlConnection = "go:secret@tcp(localhost:3306)/go?parseTime=true"

	db, err := gorm.Open("mysql", sqlConnection)
	if err != nil {
		panic(err)
	}

	//db.LogMode(true)
	db.AutoMigrate(&Item{})

	return func(c martini.Context) {
		c.Map(&db)
		//defer db.DB().Close()
		c.Next()
	}
}


func GetItems (w http.ResponseWriter, db *gorm.DB) {

	var retData struct {
		Items []Item
	}

	db.Offset(0).Limit(ITEM_PER_PAGE).Find(&retData.Items)

	w.Header().Set("Content-Type", "application/json; UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(retData); err != nil {
		panic(err.Error())
	}
}

func GetItem (w http.ResponseWriter, db *gorm.DB, p martini.Params) {
	var retData struct {
		Item Item
	}

	db.Where("id = ?", p["id"]).Find(&retData.Item)

	w.Header().Set("Content-Type", "application/json; UTF-8")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(retData); err != nil {
		panic(err.Error())
	}
}

func CreateItem (w http.ResponseWriter, db *gorm.DB, r *http.Request, i Item) {
	db.Save(&i)
	http.Redirect(w, r, "/", 301)
}

func UpdateItem (db *gorm.DB, p martini.Params, w http.ResponseWriter, r *http.Request, i Item) {
	var item Item
	db.Model(&item).Where("id = ?", p["id"]).Update(&i)
	http.Redirect(w, r, "/", 301)
}

func DeleteItem (db *gorm.DB, p martini.Params) {
	var item Item
	db.Where("id = ?", p["id"]).Delete(&item)
}
