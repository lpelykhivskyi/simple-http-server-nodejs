// todoRoutes.test.js

jest.mock('../services/todoService', () => ({
  getAllTodos: jest.fn(),
  addTodo: jest.fn(),
  deleteTodo: jest.fn(),
  getTodoById: jest.fn(),
}));

const {
  getAllTodos,
  addTodo,
  deleteTodo,
  getTodoById,
} = require('../services/todoService');

const {
  getAll,
  createTodo,
  deleteTodoById,
  getTodoByIdRoute,
} = require('./todos');

describe('Todo routes', () => {
  let req;
  let res;
  let io;

  beforeEach(() => {
    req = { body: {}, params: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    io = {
      emit: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns all todos', async () => {
      // preparation
      const todos = [{ id: '1', title: 'Test' }];
      getAllTodos.mockResolvedValue(todos);

      // action 
      await getAll(req, res);

      // checking
      expect(getAllTodos).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(todos);
    });
  });

  describe('getTodoByIdRoute', () => {
    it('returns todo by id', async () => {
      req.params.id = '1';

      const todo = { id: '1', title: 'Milk' };
      getTodoById.mockResolvedValue(todo);

      await getTodoByIdRoute(req, res);

      expect(getTodoById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ item: todo });
    });
  });

  describe('createTodo', () => {
    it('creates todo and emits socket event', async () => {
      req.body = { title: 'Buy milk' };

      const created = { id: '1', title: 'Buy milk' };
      addTodo.mockResolvedValue(created);

      await createTodo(req, res, io);

      expect(addTodo).toHaveBeenCalledWith('Buy milk');
      expect(io.emit).toHaveBeenCalledWith('item_created', created);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ item: created });
    });

    it('returns 400 if title missing', async () => {
      req.body = {};

      await createTodo(req, res, io);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Field "title" is required',
      });
    });

    it('returns 400 if body missing', async () => {
      req.body = undefined;

      await createTodo(req, res, io);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Field "title" is required',
      });
    });

    it('returns 400 if title contains only spaces', async () => {
      req.body = { title: '          '};

      await createTodo(req, res, io);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Field "title" is required',
      });
    });

    it('returns 400 if service throws error', async () => {
      req.body = { title: 'Milk' };

      addTodo.mockRejectedValue(new Error('DB error'));

      await createTodo(req, res, io);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'DB error',
      });
    });
  });

  describe('deleteTodoById', () => {
    it('deletes todo', async () => {
      req.body = { id: '1' };

      const deleted = { id: '1', title: 'Milk' };
      deleteTodo.mockResolvedValue(deleted);

      await deleteTodoById(req, res);

      expect(deleteTodo).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ item: deleted });
    });

    it('returns 400 if id missing', async () => {
      req.body = {};

      await deleteTodoById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Field "id" is required',
      });
    });

    it('returns 400 if service throws error', async () => {
      req.body = { id: '1' };

      deleteTodo.mockRejectedValue(new Error('Delete error'));

      await deleteTodoById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        error: 'Delete error',
      });
    });
  });
});