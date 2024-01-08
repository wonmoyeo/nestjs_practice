docker pull mongo
docker run --name mongo-test -v ./data:/data/db -d -p 27017:27017 mongo
docker ps -a