// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all genres from the database
    const genres = await tables.genre.readAll();

    // Respond with the genres in JSON format
    res.json(genres);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific genre from the database based on the provided ID
    const genre = await tables.genre.read(req.params.id);

    // If the genre is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the genre in JSON format
    if (genre == null) {
      res.sendStatus(404);
    } else {
      res.json(genre);
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
  // Extract the genre data from the request body
  const genre = req.body;

  try {
    // Insert the genre into the database
    const insertId = await tables.genre.create(genre);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted genre
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
