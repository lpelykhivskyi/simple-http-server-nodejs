const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { defaultRoute } = require('./routes/home');
const { getAll, createTodo, deleteTodoById, getTodoByIdRoute } = require('./routes/todos');
const { login } = require('./routes/user');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

var corsOptions = {
  origin: 'http://localhost:8081',
};

const io = new Server(server, {
  cors: { origin: '*', methods: ["GET", "POST"] },
});

io.on('connection', (socket) => {
  console.log('client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('client disconnected:', socket.id);
  });
});

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', defaultRoute);

app.get('/api/todos', getAll);

app.get('/api/todos/:id', getTodoByIdRoute);

app.post('/api/todos', (req, res) => createTodo(req, res, io));

app.delete('/api/todos', deleteTodoById);

app.post('/api/users/login', login);

// app.listen(PORT, "0.0.0.0", async () => {
//   console.log(`Server started: http://localhost:${PORT}`);
// });

server.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
