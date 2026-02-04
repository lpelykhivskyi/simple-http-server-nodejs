async function login(req, res) {
  const body = req.body;

  console.log(`User logged in with login - ${body.login} and password - ${body.password}`);

  return res.status(200).send({ login: body.login, password: body.password, loggedIn: true });
}

module.exports = { login };