include .env

start:
	docker-compose up --build -d

stop:
	docker-compose down

hard-stop:
	docker-compose down -v

reload-be:
	docker-compose up --build -d nta-be

restart: stop start

hard-restart: hard-stop start