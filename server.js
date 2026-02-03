const express = require('express');
const { defaultRoute } = require('./routes/home');
const { getAll, createTodo, deleteTodoById, getTodoById } = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', defaultRoute);

app.get('/api/todos', getAll);

app.get('/api/todos/:id', getTodoById);

app.post('/api/todos', createTodo);

app.delete('/api/todos', deleteTodoById);

app.listen(PORT, async () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
