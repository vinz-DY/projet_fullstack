const argon2 = require("argon2");

const options = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
};

const hash = async (hashpassword) => {
  try {
    return await argon2.hash(hashpassword, options);
  } catch (err) {
    console.error(err);
    throw new Error("erreur de hachage !");
  }
};

const verify = async (hashpassword, hashed) => {
  try {
    return await argon2.verify(hashed, hashpassword, options);
  } catch (error) {
    throw new Error("identifiants incorrect");
  }
};

module.exports = { hash, verify };
