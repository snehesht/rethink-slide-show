### Usage
```
git clone https://github.com/snehesht/rethink-slide-show
cd rethink-slide-show/server
yarn && yarn start

// Open http://localhost:8000
```

### API Endpoints
```
curl --request POST \
  --url http://localhost:8000/api/v1/slideshow/file \
  --header 'Content-Type: multipart/form-data' \
  --form slide=@<IMAGE_PATH>
```