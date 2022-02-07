const auth = require("../controllers/auth")

module.exports = (app) => {
  app.post("/signin", (req, res, next) => {
    auth.signin(req, res, next);
  });

  app.post("/signup", (req, res, next) => {
    auth.signup(req, res, next);
  });
};