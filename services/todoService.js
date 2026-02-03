const mysql = require('mysql2/promise');
const uuidV4 = require('uuid').v4;
// const fs = require('fs/promises');
// const path = require('path');

// const DB_PATH = path.join(__dirname, '..', 'data', 'todos.json');

const DB_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'todos',
};

async function readTodos() {
  const connection = await mysql.createConnection(DB_CONFIG);

  const [results] = await connection.query(
    'SELECT * FROM TodoItems'
  );

  await connection.end();

  return results;

  // const jsonFile = await fs.readFile(DB_PATH, 'utf-8');
  //return JSON.parse(jsonFile);
}

// async function writeTodos(todos) {
//   fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2), 'utf-8')
// }

async function getAllTodos() {
  return await readTodos();
}

async function addTodo(title) {
  const connection = await mysql.createConnection(DB_CONFIG);

  const newTodo = {
    id: uuidV4(),
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };

  const createTodoQuery = `
    INSERT INTO TodoItems (id, title, done, createAt)
    VALUES ('${newTodo.id}', '${newTodo.title}', ${newTodo.done}, '${newTodo.createdAt}')
  `;

  await connection.query(createTodoQuery);

  await connection.end();

  return newTodo;

  // const todos = await readTodos();

  // const newTodo = {
  //   id: uuidV4(),
  //   title: title.trim(),
  //   done: false,
  //   createdAt: new Date().toISOString()
  // };

  // todos.push(newTodo);

  // await writeTodos(todos);

  // return newTodo;
}

async function deleteTodo(id) {
  const connection = await mysql.createConnection(DB_CONFIG);

  const deleteTodoQuery = `
    DELETE FROM TodoItems
    WHERE id = '${id}'
  `;

  const [result] = await connection.query(deleteTodoQuery);

  await connection.end();

  return result;
  // const todos = await readTodos();

  // const todoToDelete = todos.find(todo => todo.id === id);

  // const todosWithoutRemoved = todos.filter(todo => todo.id !== id);

  // await writeTodos(todosWithoutRemoved);

  // return todoToDelete;
}

async function getTodoById(id) {
  const connection = await mysql.createConnection(DB_CONFIG);

  const getTodoByIdQuery = `
    'SELECT * FROM TodoItems WHERE id = '${id}'
  `;

  const [result] = await connection.query(getTodoByIdQuery);

  await connection.end();

  return result;
}

module.exports = { addTodo, getAllTodos, deleteTodo, getTodoById };