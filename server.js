const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(() => { });

server.listen(PORT, async () => {
  console.log(`Server started: http://localhost:${PORT}`);
});