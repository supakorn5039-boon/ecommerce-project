APP_NAME = main
OUT_DIR = tmp
SOURCE_DIR = main.go

.PHONY: build clean run

backend-build:
	mkdir -p tmp
	go build -o tmp/main ./main.go

backend-clean:
	rm -rf $(OUT_DIR)

backend-run: build
	./$(OUT_DIR)/$(APP_NAME)

backend-test:
	go test ./...	
