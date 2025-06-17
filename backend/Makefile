APP_NAME = ecommerce-backend
OUT_DIR = dist
SOURCE_DIR = cmd/api/main.go

.PHONY: build clean run

build:
	mkdir -p $(OUT_DIR)
	go build -o $(OUT_DIR)/$(APP_NAME) $(SOURCE_DIR)

clean:
	rm -rf $(OUT_DIR)

run: build
	./$(OUT_DIR)/$(APP_NAME)
