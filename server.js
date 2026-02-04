const express = require('express');
const cors = require('cors');
const { defaultRoute } = require('./routes/home');
const { getAll, createTodo, deleteTodoById, getTodoByIdRoute } = require('./routes/todos');
const { login } = require('./routes/user');

const PORT = process.env.PORT || 3000;

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
}; 

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', defaultRoute);

app.get('/api/todos', getAll);

app.get('/api/todos/:id', getTodoByIdRoute);

app.post('/api/todos', createTodo);

app.delete('/api/todos', deleteTodoById);

app.post('/api/users/login', login);

app.listen(PORT, async () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
