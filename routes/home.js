function defaultRoute(req, res) {
  res.status(200).send([
    'TODOs API is running',
    '',
    'GET /api/todos',
    'POST /api/todos, {"title": "Buy milk"}'
  ].join('\n'));
}


module.exports = { defaultRoute };