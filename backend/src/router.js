const express = require("express");

const router = express.Router();
// const client = require("../database/client");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const gameControllers = require("./controllers/gameControllers");

router.get("/games", gameControllers.browse);
// => {
//   client
//     .query("SELECT * FROM game")
//     .then((result) => {
//       res.status(200).json(result[0]);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

router.get("/games/:id", gameControllers.read);

router.put("/games/:id", gameControllers.edit);
// => {
//   const gameId = req.params.id;
//   const query = `
//     SELECT game.*, genre.*
//     FROM game
//     LEFT JOIN genre ON game.genre_id = genre.id
//     WHERE game.id = ?
//   `;

//   client
//     .query(query, [gameId])
//     .then(([game]) => {
//       if (game[0].length === 0) {
//         res.status(404).json({ message: "Aucun jeu trouvé" });
//       } else {
//         res.status(200).json(game[0]);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// Route to get a specific item by ID
// router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/games", gameControllers.add);

const genreControllers = require("./controllers/genreControllers");

router.get("/genres", genreControllers.browse);

router.delete("/games/:id", gameControllers.destroy);

module.exports = router;
