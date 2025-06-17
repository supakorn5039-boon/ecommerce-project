.PHONY: backend-build backend-run backend-clean frontend-install frontend-build frontend-test

# Backend
backend-build:
	cd backend && make build

backend-run:
	cd backend && make run

backend-test:
	cd backend && make test

backend-clean:
	cd backend && make clean

# Frontend
frontend-install:
	cd frontend && make install

frontend-build:
	cd frontend && make build
