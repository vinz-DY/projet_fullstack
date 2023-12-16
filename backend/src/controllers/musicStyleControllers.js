// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all musicStyles from the database
    const musicStyles = await tables.musicStyle.readAll();

    // Respond with the musicStyles in JSON format
    res.json(musicStyles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific musicStyle from the database based on the provided ID
    const musicStyle = await tables.musicStyle.read(req.params.id);

    // If the musicStyle is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the musicStyle in JSON format
    if (musicStyle == null) {
      res.sendStatus(404);
    } else {
      res.json(musicStyle);
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
  // Extract the musicStyle data from the request body
  const musicStyle = req.body;

  try {
    // Insert the musicStyle into the database
    const insertId = await tables.musicStyle.create(musicStyle);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted musicStyle
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
