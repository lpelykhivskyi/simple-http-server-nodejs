const { defaultRoute } = require('./home');

describe('home route:', () => {
  describe('defaultRoute', () => {
    let req;
    let res;

    beforeEach(() => { // run before each test
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    afterEach(() => { }); // run after each test
    beforeAll(() => { }); // run before all tests in describe
    afterAll(() => { }); // run after all tests in describe

    test('responds with 200', () => {
      defaultRoute(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('sends the expected multiline help text', () => {
      defaultRoute(req, res);

      const expectedBody = [
        'TODOs API is running',
        '',
        'GET /api/todos',
        'POST /api/todos, {"title": "Buy milk"}',
      ].join('\n');

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(expectedBody);
    });

    test('calls status before send', () => {
      defaultRoute(req, res);

      const statusOrder = res.status.mock.invocationCallOrder[0];
      const sendOrder = res.send.mock.invocationCallOrder[0];

      expect(statusOrder).toBeLessThan(sendOrder);
    });

    test('does not require anything from req', () => {
      defaultRoute(undefined, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });
  });
});