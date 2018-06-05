DOCKER := $(shell which docker)
DOCKER_TAG := arablocks/ann-dht

docker: Dockerfile
	$(DOCKER) build -t $(DOCKER_TAG) .

