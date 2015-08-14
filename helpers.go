package main

import (
	"os"
	"fmt"
	"log"
	"time"
	"bufio"
	"errors"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

func PanicIf(err error) {
	if err != nil {
		panic(err)
	}
}

func ReadFile (filename string) map[string]string {
	conf := make(map[string]string)

	file, err := os.Open(PATH + filename)
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

func look(kind interface{}) (interface{}, error) {
	if str, ok := kind.(string); ok {
		switch str {
		case "login":
			return []byte(SecretKey), nil
		}
	}
	return "", errors.New("unknown jwt kind")
}

func createToken(userinfo map[string]string, secret string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims["id"] = userinfo["id"]
	token.Claims["email"] = userinfo["email"]
	token.Claims["login"] = userinfo["login"]
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

func parseJWT(myToken string, myLookupKey func(interface{}) (interface{}, error)) interface{} {
	var a interface{}
	myToken = strings.Replace(myToken, "Bearer ", "", -1)
	token, err := jwt.Parse(myToken, func(token *jwt.Token) (interface{}, error) {
		return myLookupKey(token.Header["kind"])
	})
	PanicIf(err)
	if token.Valid {
		return token.Claims
	}
	return a
}

func NewError(msg string) *Error {
	return &Error{Error: msg}
}
