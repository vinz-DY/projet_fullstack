const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, "gfodufnfofyufhfkfzefzef");
};

const verifyToken = (token) => {
  return jwt.verify(token, "gfodufnfofyufhfkfzefzef");
};

module.exports = { createToken, verifyToken };
