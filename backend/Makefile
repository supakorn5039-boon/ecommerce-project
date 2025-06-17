APP_NAME = ecommerce-backend
OUT_DIR = dist
SOURCE_DIR = cmd/api/main.go

.PHONY: build clean run

backend-build:
	mkdir -p tmp
	go build -o tmp/main ./cmd/api

backend-clean:
	rm -rf $(OUT_DIR)

backend-run: build
	./$(OUT_DIR)/$(APP_NAME)

backend-test:
	go test ./...	
