const jwt = require("jsonwebtoken")

/* 
should be moved to its own file in the future.
*/
exports.decryptToken = (token) => {
  const result = jwt.decode(token);
  return result;
};