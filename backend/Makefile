APP_NAME = main
OUT_DIR = tmp
SOURCE_DIR = main.go

.PHONY: build clean run

backend-clean:
	rm -rf $(OUT_DIR)

backend-run: build
	./$(OUT_DIR)/$(APP_NAME)

backend-test:
	go test ./...	
