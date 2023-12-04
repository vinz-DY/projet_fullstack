// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all games from the database
    const games = await tables.game.readAll();

    // Respond with the games in JSON format
    res.json(games);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific game from the database based on the provided ID
    const game = await tables.game.read(req.params.id);

    // If the game is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the game in JSON format
    if (game == null) {
      res.sendStatus(404);
    } else {
      res.json(game);
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
  // Extract the game data from the request body
  const game = req.body;

  try {
    // Insert the game into the database
    const insertId = await tables.game.create(game);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted game
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
