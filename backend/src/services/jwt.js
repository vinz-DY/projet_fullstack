const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, "tokenOrNotToken");
};

const verifyToken = (token) => {
  return jwt.verify(token, "tokenOrNotToken");
};

module.exports = { createToken, verifyToken };
