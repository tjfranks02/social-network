const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const jwtSecret = require("../config/keys").authKeys.jwtSecret
const refreshSecret = require("../config/keys").authKeys.refreshSecret
const connection = require("../connect")
const util = require("../util")
const { notStrictEqual } = require("assert")

const SALT_ROUNDS = 10;


/*
given a username, generates a json web token for the user.

params:
  username (string): the username to use in encoding the jwt.
  secret(string): jwt secret string used for encoding.
  expiry(string): how long is the token valid for? e.g. 1d, 3s etc.

returns (string):
  the jwt for the user to use in authenticated requests.
*/
const genToken = (username, secret, expiry) => {
  let token = jwt.sign(
    {sub: username}, 
    secret,
    {expiresIn: expiry}
  );
  return token;
};


/*
attempts to find a user in the database with the specified username or
password.

params:
  username (string): the username to search for in the db.
  email (string): the email to search for the in the db.

returns (Promise):
  resolved when db successfully queried and res returned, rejected otherwise.
*/
const findOneUser = (username, email) => {
  let sql = util.format("SELECT username " 
    + "FROM users "
    + "WHERE username='{0}' OR email='{1}';", username, email
  );

  return connection(sql)
};


/*
attempts to insert a user into the database.

params:
  username (string): the username of the user being inserted.
  email (string): the email of the user being inserted.
  password (string): the password of the user being inserted.

returns (Promise):
  resolves if user succesfully inserted, rejects otherwise.
*/
const insertOneUser = (username, email, password, userId) => {
  let sql = util.format("INSERT INTO users "
    + "VALUES('{0}','{1}','{2}','{3}');", userId, username, password, email
  );
    return connection(sql);
};


/*
given a plaintext password, uses bcrypt to hash the password.

params:
  password (string): the plaintext password to hash.

returns (Promise):
  resolved when hash is successfully performed, rejected otherwise.
*/
const hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};  

/*
attempt to sign-in a user given the request they have made to the server.

params:
  req ({}): the request object provided by express.
  res ({}): the response object provided by express.
  next (function): a function used to trigger the next express middleware.

returns:
  the res object.
*/
exports.signin = (req, res, next) => {
  return res.json({message: "Yee"});
};  


/*
attempt to sign-up user given the request they have made to the server.

params:
  req ({}): the request object provided by express.
  res ({}): the response object provided by express.
  next (function): a function used to trigger the next express middleware.

returns:
  the res object.
*/
exports.signup = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let userId = crypto.randomBytes(16).toString("hex");

  if (!username || !password || !email) {
    return Promise.reject({
      errorMSG: "All of username, password and email must be present."
    });
  }

  findOneUser(username, email)
  .then((results) => {
    return new Promise((resolve, reject) => {

      if (results.length > 0) {
        reject({
          errorMSG: "There is already a user with that username or password."
        });
      } else {
        resolve(results);
      }
    });
  })
  .then(() => hashPassword(password))
  .then((hash) => {
    return insertOneUser(username, email, hash, userId);
  }).then(() => {
    return new Promise((resolve) => {
      res.json({
      token: genToken(username, jwtSecret, "30d"),
      refresh_token: genToken(username, refreshSecret, "30d")
      });
      resolve();
    });
  }).catch((err) => {
    return res.status(500).send(err)
  });
};
