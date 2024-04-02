// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all laserdiscs from the database
    const laserdiscs = await tables.laserdisc.readAll();

    // Respond with the laserdiscs in JSON format
    res.json(laserdiscs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific laserdisc from the database based on the provided ID
    const laserdisc = await tables.laserdisc.read(req.params.id);

    // If the laserdisc is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the laserdisc in JSON format
    if (laserdisc == null) {
      res.sendStatus(404);
    } else {
      res.json(laserdisc);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

// This operation is not yet implemented
const edit = async (req, res, next) => {
  // Extract the laserdisc data from the request body
  const laserdisc = req.body;

  try {
    await tables.laserdisc.update(req.params.id, laserdisc);
    // Insert the laserdisc into the database

    // Respond with HTTP 201 (Created) and the ID of the newly inserted laserdisc
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the laserdisc data from the request body
  const laserdisc = req.body;

  try {
    // Insert the laserdisc into the database
    const insertId = await tables.laserdisc.create(laserdisc);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted laserdisc
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the laserdiscId data from the request body
  const laserdiscId = req.params.id;

  try {
    // delete the laserdisc into the database
    await tables.laserdisc.delete(laserdiscId);

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
