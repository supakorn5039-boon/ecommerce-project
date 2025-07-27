package models

type ServerConfig struct {
	Port       int  `ini:"port"`
	Production bool `ini:"production"`
}

type DatabaseConfig struct {
	Host     string `ini:"host"`
	User     string `ini:"user"`
	Password string `ini:"password"`
	Name     string `ini:"name"`
	Port     int    `ini:"port"`
}

type Config struct {
	Server     ServerConfig   `ini:"server"`
	Database   DatabaseConfig `ini:"database"`
	Production bool
}
