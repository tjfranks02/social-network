const jwt = require("jsonwebtoken")

const jwtSecret = require("../config/keys").authKeys.jwtSecret
const refreshSecret = require("../config/keys").authKeys.refreshSecret
const connection = require("../connect")
const util = require("../util")

const SALT_ROUNDS = 10;

function genToken(user, secret, expiry) {
  let token = jwt.sign(
    {sub: user.username}, 
    secret,
    {expiresIn: "1hr"}
  );
  return token;
}

exports.signin = (req, res, next) => {
  return res.json({message: "Yee"});
};  

exports.signup = (req, res, next) => {
  return res.json({message: "Haw"});
};