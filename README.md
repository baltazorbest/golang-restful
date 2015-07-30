### Version
0.2.1

### Tech

golang-restful uses a number of open source projects to work properly:

* [Go Lang] - Awesome language from Google. 
* [GORM] - Awesome ORM fro Go and mysql/postgresql/sqlite3
* [Go Mysql] - A MySQL-Driver for Go's database/sql package
* [GoLang Gin] - Gin is a web framework written in Golang.
* [JWT] - JSON Web Token is a compact URL-safe means of representing claims to be transferred between two parties.
* [GoLang JWT] - A go implementation of JSON Web Tokens
* [MySQL] - Database for your items.
* [AngularJS] - HTML enhanced for web apps.
* [Twitter Bootstrap] - Great UI boilerplate for modern web apps.
* [jQuery] - jQuery is a fast, small, and feature-rich JavaScript library.

### Installation

```sh
$ mysql -uroot
$ grant usage on *.* to 'go'@'localhost' identified by 'secret'; - you can change username and password
$ create database `go` character set utf8 collate utf8_general_ci; - you can change database name
$ grant all privileges on `go`.* to 'go'@'localhost'; - if you change username or database name, you need change here
$ cd $GOPATH
$ git clone [git-repo-url] golang-restful
$ cd golang-restful
$ go get
$ edit config.txt file if you change DB: username or password or database name
$ go run *.go
```

### Todo's

- Write Tests
- Write Authentication
- Write Registration
- Write User profile

License
----

Apache 2.0


**Free Software, Hell Yeah!**

[marked]:https://github.com/chjj/marked
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[AngularJS]:http://angularjs.org
[Go Lang]:https://golang.org/
[MySQL]:https://www.mysql.com/
[Go Mysql]:https://github.com/go-sql-driver/mysql
[GoLang Gin]:https://github.com/gin-gonic/gin
[GORM]:https://github.com/jinzhu/gorm
[GoLang JWT]:https://github.com/dgrijalva/jwt-go
[JWT]:http://jwt.io
