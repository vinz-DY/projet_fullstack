// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all movieStyles from the database
    const movieStyles = await tables.movieStyle.readAll();

    // Respond with the movieStyles in JSON format
    res.json(movieStyles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific movieStyle from the database based on the provided ID
    const movieStyle = await tables.movieStyle.read(req.params.id);

    // If the movieStyle is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the movieStyle in JSON format
    if (movieStyle == null) {
      res.sendStatus(404);
    } else {
      res.json(movieStyle);
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
  // Extract the movieStyle data from the request body
  const movieStyle = req.body;

  try {
    // Insert the movieStyle into the database
    const insertId = await tables.movieStyle.create(movieStyle);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted movieStyle
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
