// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    // Fetch all discs from the database
    const discs = await tables.disc.readAll(searchTerm);

    // Respond with the discs in JSON format
    res.status(200).json(discs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific disc from the database based on the provided ID
    const disc = await tables.disc.read(req.params.id);

    // If the disc is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the disc in JSON format
    if (disc == null) {
      res.sendStatus(404);
    } else {
      res.json(disc);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the disc data from the request body
  const disc = req.body;

  try {
    await tables.disc.update(req.params.id, disc);
    // Insert the disc into the database

    // Respond with HTTP 201 (Created) and the ID of the newly inserted disc
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the disc data from the request body
  const disc = req.body;

  try {
    // Insert the disc into the database
    const insertId = await tables.disc.create(disc);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted disc
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the discId data from the request body
  const discId = req.params.id;

  try {
    // delete the disc into the database
    await tables.disc.delete(discId);

    // Check the result of the deletion
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
