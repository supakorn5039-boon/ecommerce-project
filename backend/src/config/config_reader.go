package config

import (
	"ecommerce/backend/src/models"

	"gopkg.in/ini.v1"
)

type AppConfig struct {
	Config *models.Config
}

func NewAppConfig() *AppConfig {
	return &AppConfig{
		Config: &models.Config{},
	}
}

func (a *AppConfig) Load(path string) error {
	cfg, err := ini.Load(path)
	if err != nil {
		return err
	}

	serverSection := cfg.Section("server")
	production := serverSection.Key("production").MustBool(false)

	a.Config.Server.Port = serverSection.Key("port").MustInt(8080)
	a.Config.Server.Production = production
	a.Config.Production = production

	// Load proper DB section
	var dbSection *ini.Section
	if production {
		dbSection = cfg.Section("production")
	} else {
		dbSection = cfg.Section("development")
	}

	a.Config.Database.Host = dbSection.Key("host").String()
	a.Config.Database.Port = dbSection.Key("port").MustInt(5432)
	a.Config.Database.User = dbSection.Key("user").String()
	a.Config.Database.Password = dbSection.Key("password").String()
	a.Config.Database.Name = dbSection.Key("name").String()

	return nil
}
