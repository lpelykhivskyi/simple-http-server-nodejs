# Simple HTTP server

## Run 

```
npm install
npm run start
```

## Testing

GET todos

```
curl http://localhost:3000/api/todos
```

POST create todo

```
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{ "title": "Learn Node.js " }'
```