.PHONY : build shell exec

all: build

build:
	docker build -f Dockerfile.FE -t fe-container .
	docker run -itd --name helmfe -v ${CURDIR}/:/home/frontenduser/workdir -p 3000:3000 fe-container bash -c "/bin/sleep infinity"

destroy:
	docker stop helmfe
	docker rm -v helmfe
	
shell:
	docker exec -it helmfe bash

install:
	docker exec -it helmfe bash -c "npm install"

exec:
	docker exec -it helmfe bash -c "npm start"

build-app:
	docker exec helmfe bash -c "npm run build"

test:
	docker exec helmfe bash -c "npm test"