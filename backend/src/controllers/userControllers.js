// Import access to database tables
const argon2 = require("argon2");
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    // console.log(req.body);
    const user = await tables.user.read(req.body.email);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const user = req.body;

  try {
    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(user.hashpassword);

    // Replace the plain text password with the hashed password in the user object
    user.hashpassword = hashedPassword;

    // Insert the user with the hashed password into the database
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  login,
  // edit,
  add,
  // destroy,
};
