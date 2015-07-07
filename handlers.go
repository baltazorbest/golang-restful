package main

import (
	"net/http"
	"encoding/json"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/go-martini/martini"
	"code.google.com/p/go.crypto/bcrypt"
)

var SecretKey = Cfg["SecretKey"]

/**
Connect to Database
**/
func DB() martini.Handler {
	sqlConnection = Cfg["DB_USER"] + ":" + Cfg["DB_PASSWORD"] + "@tcp(" + Cfg["DB_HOST"] + ":" + Cfg["DB_PORT"] + ")/" + Cfg["DB_NAME"] + "?parseTime=true"

	db, err := gorm.Open("mysql", sqlConnection)
	PanicIf(err)

	db.LogMode(true)
	db.AutoMigrate(&Item{}, &User{})

	return func(c martini.Context) {
		c.Map(&db)
		//defer db.DB().Close()
		c.Next()
	}
}

/**
Handlers for items
**/
func GetItems (w http.ResponseWriter, db *gorm.DB) {

	var retData struct {
		Items []Item
	}

	db.Offset(0).Limit(Cfg["ITEM_PER_PAGE"]).Find(&retData.Items)

	w.Header().Set("Content-Type", "application/json; UTF-8")
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

/**
Handlers for user
**/
func Login (w http.ResponseWriter, u User, db *gorm.DB) {
	var (
		data map[string]string = make(map[string]string)
		user User
	)

	db.Find(&user, "email = ? and active = 1", u.Email)

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Password)); err == nil {
		userinfo := map[string]string{
			"id": string(user.Id),
			"email": u.Email,
			"username": user.Username,
		}
		tokenString, err := createToken(userinfo, SecretKey)
		PanicIf(err)

		data["token"] = tokenString
		data["status"] = "ok"
	} else {
		data["token"] = "unautorize"
		data["status"] = "Error"
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err)
	}

}

func (u *User) AfterCreate(db *gorm.DB) (err error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	PanicIf(err)
	db.Model(u).Update(map[string]interface{}{"password": hashedPassword, "active": 1})
	return
}

func Signup(db *gorm.DB, u User) {
	db.Save(&u)
}

func GetUser(w http.ResponseWriter, p martini.Params, r *http.Request, db *gorm.DB) {
	var (
		data map[string]interface{} = make(map[string]interface{})
		user User
	)

	token := r.Header.Get("Authorization")

	if len(token) < 5 {
		data["status"] = "token is empty"
	} else if err := verifyToken(token, look); err != nil {
		data["status"] = "error checked token"
	} else {
		data["status"] = "ok"
	}

	db.Select("id, username, email, name").Find(&user, "username = ?", p["username"])

	data["user"] = user

	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err.Error())
	}
}

func EditUser (db *gorm.DB, p martini.Params, u User, r *http.Request) {
	var user User
	token := r.Header.Get("Authorization")
	tokenData := parseJWT(token, look)
	userinfo, _ := tokenData.(map[string]interface{})

	if userinfo["username"].(string) == string(u.Username) {

		db.Model(&user).Where("username = ?", p["username"]).UpdateColumn( map[string]interface{}{
			"username": u.Username,
			"email": u.Email,
			"name": u.Name,
		})

		if u.Password != "" {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
			PanicIf(err)
			db.Model(&user).Where("username = ?", p["username"]).UpdateColumn(map[string]interface{}{"password": hashedPassword})
		}
	}

}
