package main

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"errors"
	"strings"
)

func look(kind interface{}) (interface{}, error) {
	if str, ok := kind.(string); ok {
		switch str {
		case "login":
			return []byte(SecretKey), nil
		}
	}

	return "", errors.New("unknown jwt kind")
}

func createToken(useremail, secret string) (string, error) {

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims["useremail"] = useremail
	token.Header["kind"] = "login"
	token.Claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}


func verifyToken(myToken string, myLookupKey func(interface{}) (interface{}, error)) error {

	myToken = strings.Replace(myToken, "Bearer ", "", -1)

	token, err := jwt.Parse(myToken, func(token *jwt.Token) (interface{}, error) {
		return myLookupKey(token.Header["kind"])
	})

	if token.Valid {
		return nil
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			fmt.Println("That's not even a token")
			return err
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			// Token is either expired or not active yet
			fmt.Println("Timing is everything")
			return err
		} else {
			fmt.Println("Couldn't handle this token:", err)
			return err
		}
	} else {
		fmt.Println("Couldn't handle this token:", err)
		return err
	}

}