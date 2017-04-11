package main

import (
	"time"
	"regexp"
	"strconv"
	"github.com/jinzhu/gorm"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type userResource struct {
	db *gorm.DB
}

func (u *userResource) Login(c *gin.Context) {
	var (
		user User
		exist User
		userinfo map[string]string = make(map[string]string)
	)

	err := c.Bind(&user)
	if err != nil {
		c.JSON(400, NewError("problem decoding body"))
		return
	}

	if user.Email == "" || user.Password == "" {
		c.JSON(401, NewError("login & password is required"))
		return
	}

	u.db.Find(&exist, "email = ? and status = 1", user.Email)

	if err := bcrypt.CompareHashAndPassword([]byte(exist.Password), []byte(user.Password)); err == nil {
		userinfo["id"] = strconv.Itoa(int(exist.Id))
		userinfo["email"] = exist.Email
		userinfo["login"] = exist.Login
		tokenString, err := createToken(userinfo, SecretKey)
		PanicIf(err)

		c.JSON(200, gin.H{
			"token": tokenString,
			"status": "ok",
		})
		return
	} else {
		c.JSON(401, gin.H{
			"token": "unautorize",
			"status": "error",
		})
	}



}

func (u *userResource) GetUser(c *gin.Context) {
	login := u.getLogin(c)
	if login == "" {
		c.JSON(400, NewError("problem with login"))
		return
	}

	token := c.Request.Header.Get("Authorization")

	if len(token) < 5 {
		c.JSON(400, NewError("token is empty"))
		return
	} else if err := verifyToken(token, look); err != nil {
		c.JSON(400, "error checked token")
		return
	}

	var user User

	if u.db.Select("id, login, name, email, created").Find(&user, "login = ? and status = 1", login).RecordNotFound() {
		c.JSON(404, NewError("user not found"))
		return
	} else {
		c.JSON(200, &user)
	}
}

func (u *userResource) CreateUser(c *gin.Context) {
	var user User

	err := c.Bind(&user)
	if err != nil {
		c.JSON(400, NewError("problem decoding body"))
		return
	}

	user.Status = 1
	user.Created = time.Now()
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	PanicIf(err)
	user.Password = string(hashedPassword)

	u.db.Save(&user)

}

func (u *userResource) UpdateUser(c *gin.Context) {
	login := u.getLogin(c)
	if login == "" {
		c.JSON(400, NewError("problem with login"))
		return
	}

	var (
		user User
		exist User
		existing User
	)

	err := c.Bind(&user)
	if err != nil {
		c.JSON(400, NewError("problem decoding body"))
		return
	}

	token := c.Request.Header.Get("Authorization")
	tokenData := parseJWT(token, look)
	userinfo, _ := tokenData.(map[string]interface{})

	if userinfo["login"].(string) != user.Login {
		c.JSON(401, NewError("Not authorization"))
		return
	}

	if u.db.Find(&existing, "login = ?", login).RecordNotFound() {
		c.JSON(404, NewError("user not found"))
		return
	} else {
		user.Login = existing.Login
		user.Created = existing.Created
		user.Status = existing.Status
		user.Email = existing.Email
		if user.Password != "" {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			PanicIf(err)
			user.Password = string(hashedPassword)
		} else {
			user.Password = existing.Password
		}
		u.db.Model(&exist).Where("login = ?", login).Update(&user)
	}
}

func (u *userResource) getLogin(c *gin.Context) (string) {
	login := c.Params.ByName("login")

	reg := regexp.MustCompile("^[a-zA-Z0-9]+$")

	if reg.MatchString(login) {
		return login
	} else {
		return ""
	}
}