# creating-network-between-docker
Creating network between 2 applications to interact with each other using Docker.

The application1 is regarding storing the contents in the file given in the request body. The application2 is for validating whether the file data is in csv format or not and based on that, it returns the response.

Also, both the applications have been build using NodeJS and docker images have been created and stored on DockerHub.

Now, to connect both the applications, I have create docker-compose.ml file which creates the network between 2 applications.
