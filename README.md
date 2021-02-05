### Usage

  cd server;
  yarn start

  // Open http://localhost:8000

### API Endpoints
  curl --request POST \
    --url http://localhost:8000/api/v1/slideshow/file \
    --header 'Content-Type: multipart/form-data' \
    --form slide=@<IMAGE_PATH>