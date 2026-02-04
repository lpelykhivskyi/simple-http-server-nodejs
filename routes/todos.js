const { getAllTodos, addTodo, deleteTodo, getTodoById } = require('../services/todoService');

// function sendJson(response, statusCode, payload) {
//   const body = JSON.stringify(payload);

//   response.writeHead(statusCode, {
//     'Content-Type': 'application/json; charset=utf-8',
//     'Content-Length': Buffer.byteLength(body)
//   });

//   response.end(body);
// }

async function getAll(req, res) {
  const todos = await getAllTodos();
  res.status(200).json(todos);
}

async function getTodoByIdRoute(req, res) {
  const id = req.params.id;
  const todo = await getTodoById(id);

  return res.status(200).json({ item: todo });
  // const todos = await getAllTodos();
  // const foundTodo = todos.find(todo => todo.id === id);
}

async function createTodo(req, res) {
  try {
    const body = req.body;

    if (!body || typeof body.title !== 'string' || body.title.trim() === '') {
      return res.status(400).send({ error: 'Field \"title\" is required' });
    }

    const createdTodo = await addTodo(body.title);

    return res.status(201).send({ item: createdTodo });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
}

async function deleteTodoById(req, res) {
  try {
    const body = req.body;

    if (!body || typeof body.id !== 'string' || body.id.trim() === '') {
      return res.status(400).send({ error: 'Field \"id\" is required' });
    }

    const todoToDelete = await deleteTodo(body.id);
    return res.status(201).send({ item: todoToDelete });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
}

// async function handleTodos(request, response) {
//   // HTTP GET method /api/todos
//   if (request.method === 'GET') {
//     const todos = await getAllTodos();
//     return sendJson(response, 200, { items: todos });
//   }

//   // HTTP POST method /api/todos
//   if (request.method === 'POST') {
//     try {
//       const body = await readJsonBody(request);

//       if (!body || typeof body.title !== 'string' || body.title.trim() === '') {
//         return sendJson(response, 400, { error: 'Field \"title\" is required' });
//       }

//       const createdTodo = await addTodo(body.title);
//       return sendJson(response, 201, { item: createdTodo });
//     } catch (err) {
//       return sendJson(response, 400, { error: err.message })
//     }
//   }

//   // HTTP DELETE methods api/todos
//   if (request.method === 'DELETE') {
//     try {
//       const body = await readJsonBody(request);

//       if (!body || typeof body.id !== 'string' || body.id.trim() === '') {
//         return sendJson(response, 400, { error: 'Field \"id\" is required' });
//       }

//       const todoToDelete = await deleteTodo(body.id);
//       return sendJson(response, 201, { item: todoToDelete });
//     } catch (err) {
//       return sendJson(response, 400, { error: err.message })
//     }
//   }
// }


module.exports = { getAll, createTodo, deleteTodoById, getTodoByIdRoute };