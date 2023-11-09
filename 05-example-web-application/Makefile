
include .$(PWD)/.env

.PHONY: run-mysql
run-mysql:
	@echo Starting mysql container
	-docker run -d --rm \
  		-v mysqldata:/var/lib/mysql \
  		-e MYSQL_ROOT_PASSWORD=${DATABASE_PASS} \
  		mysql:8.0.32

.PHONY: run-api-node
run-api-node:
	@echo Starting node api
	(SET DATABASE_URL=${DATABASE_URL} && cd api-node && npm run dev)

.PHONY: run-api-golang
run-api-golang:
	@echo Starting golang api
	(SET DATABASE_URL=${DATABASE_URL} cd api-golang && go run main.go)
		 
		

.PHONY: run-client-react
run-client-react:
	@echo Starting react client
	cd client-react && \
		npm run dev
