const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const jwtSecret = require("../config/keys").authKeys.jwtSecret
const refreshSecret = require("../config/keys").authKeys.refreshSecret
const connection = require("../connect")
const util = require("../util")

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
function genToken(username, secret, expiry) {
  let token = jwt.sign(
    {sub: username}, 
    secret,
    {expiresIn: expiry}
  );
  return token;
}

exports.signin = (req, res, next) => {
  return res.json({message: "Yee"});
};  

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

  let findOneUser = util.format("SELECT username " 
    + "FROM users "
    + "WHERE username='{0}' OR email='{1}';", username, email
  );

  connection(findOneUser).then((results) => {

    if (results.length !== 0) {
      return Promise.reject({
        errorMSG: "A user already exists with that username."
      });
    }

    return bcrypt.hash(password, SALT_ROUNDS);

  }).then((hash) => {

    let insertOneUser = util.format("INSERT INTO users "
      + "VALUES('{0}','{1}','{2}','{3}');", userId, username, hash, email
    );
    return connection(insertOneUser);

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
