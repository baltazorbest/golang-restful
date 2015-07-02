### Version
0.1

### Tech

golang-restful uses a number of open source projects to work properly:

* [Go Lang] - awesome keyboard handler lib by
* [MySQL] - database for your items.
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
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
$ cd golang-restful
$ go run *.go
```

### Todo's

Write Tests
Write delete items
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
