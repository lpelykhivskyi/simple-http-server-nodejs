const { readJsonBody } = require('../utils/jsonBody');
const { getAllTodos, addTodo } = require('../services/todoService');

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);

  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });

  response.end(body);
}

function handleTodos(request, response) { }


exports.module = { handleTodos };