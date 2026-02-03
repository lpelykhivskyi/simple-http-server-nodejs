const fs = require('fs/promises');
const path = require('path');
const uuidV4 = require('uuid').v4;

const DB_PATH = path.join(__dirname, '..', 'data', 'todos.json');

async function readTodos() {
  const jsonFile = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(jsonFile);
}

async function writeTodos(todos) {
  fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2), 'utf-8')
}

async function getAllTodos() {
  return await readTodos();
}

async function addTodo(title) {
  const todos = await readTodos();

  const newTodo = {
    id: uuidV4(),
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  await writeTodos(todos);

  return newTodo;
}

async function deleteTodo(id) {
  const todos = await readTodos();

  const todoToDelete = todos.find(todo => todo.id === id);

  const todosWithoutRemoved = todos.filter(todo => todo.id !== id);

  await writeTodos(todosWithoutRemoved);

  return todoToDelete;
}

module.exports = { addTodo, getAllTodos, deleteTodo };