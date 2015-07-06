### Version
0.1

### Tech

golang-restful uses a number of open source projects to work properly:

* [Go Lang] - Awesome language from Google. 
* [GORM] - Awesome ORM fro Go and mysql/postgresql/sqlite3
* [Go Mysql] - A MySQL-Driver for Go's database/sql package
* [GoLang Martini] - Powerful package for quickly writing modular web applications/services in Golang.
* [Martini Binding] - Request data binding for Martini.
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
$ go get github.com/go-sql-driver/mysql
$ go get github.com/jinzhu/gorm
$ go get github.com/go-martini/martini
$ go get github.com/martini-contrib/binding
$ go get github.com/martini-contrib/render
$ go get github.com/dgrijalva/jwt-go
$ go get code.google.com/p/go.crypto/bcrypt
$ cd golang-restful
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
[GoLang Martini]:https://github.com/go-martini/martini
[GORM]:https://github.com/jinzhu/gorm
[Martini Binding]:https://github.com/codegangsta/martini-contrib/tree/master/binding
[GoLang JWT]:https://github.com/dgrijalva/jwt-go
[JWT]:http://jwt.io
