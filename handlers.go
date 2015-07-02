package main

import (
	"net/http"
	"encoding/json"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/go-martini/martini"
)

func DB() martini.Handler {
	sqlConnection = Cfg["DB_USER"] + ":" + Cfg["DB_PASSWORD"] + "@tcp(" + Cfg["DB_HOST"] + ":" + Cfg["DB_PORT"] + ")/" + Cfg["DB_NAME"] + "?parseTime=true"

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

	db.Offset(0).Limit(Cfg["ITEM_PER_PAGE"]).Find(&retData.Items)

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

func CreateItem (db *gorm.DB, i Item) {
	db.Save(&i)
}

func UpdateItem (db *gorm.DB, p martini.Params, i Item) {
	var item Item
	db.Model(&item).Where("id = ?", p["id"]).Update(&i)
}

func DeleteItem (db *gorm.DB, p martini.Params) {
	var item Item
	db.Where("id = ?", p["id"]).Delete(&item)
}
