const express = require("express");

const router = express.Router();
const client = require("../database/client");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/games", (req, res) => {
  client
    .query("SELECT * FROM game")
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Route to get a specific item by ID
router.get("/games/:id", (req, res) => {
  client
    .query("SELECT * FROM game WHERE id = ?", [req.params.id])
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).json({ message: "Aucun jeux trouvé" });
      } else {
        res.status(200).json(result[0][0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
