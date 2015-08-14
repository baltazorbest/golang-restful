package main

const (
	PATH = "/go/bin/"
	CONFIG_FILE  = "config.txt"
)

var (
	sqlConnection string
	Cfg map[string]string = ReadFile(CONFIG_FILE)
	SecretKey = Cfg["SecretKey"]
)




func main() {
	svc := BlogService{}
	svc.Run()
}


