.PHONY : build shell exec

all: build

build:
	docker build -f Dockerfile.FE -t fe-container .

shell:
	docker run -it -v ${CURDIR}/:/home/frontenduser/workdir -p 3000:3000 fe-container bash

exec:
	docker run -it -v ${CURDIR}/:/home/frontenduser/workdir -p 3000:3000 fe-container npm start

build:
	docker run -it -v ${CURDIR}/:/home/frontenduser/workdir -p 3000:3000 fe-container npm run build

test:
	docker run -it -v ${CURDIR}/:/home/frontenduser/workdir -p 3000:3000 fe-container npm test