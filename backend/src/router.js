const express = require("express");

const router = express.Router();
// const client = require("../database/client");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const gameControllers = require("./controllers/gameControllers");
const discControllers = require("./controllers/discControllers");
const userControllers = require("./controllers/userControllers");
const validateUser = require("./validators/validateUser");
const validateGame = require("./validators/validateGame");
const validateDisc = require("./validators/validateDisc");
const checkCredentials = require("./middlewares/checkCredentials");

router.get("/discs", discControllers.browse);

router.get("/users", userControllers.browse);

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
router.get("/discs/:id", discControllers.read);

router.put("/games/:id", checkCredentials, validateGame, gameControllers.edit);
router.put("/discs/:id", checkCredentials, validateDisc, discControllers.edit);
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
router.post("/games", checkCredentials, validateGame, gameControllers.add);
router.post("/discs", checkCredentials, validateDisc, discControllers.add);
router.post("/users", validateUser, userControllers.add);
router.post("/login", validateUser, userControllers.login);
router.post("/logout", userControllers.logout);

const genreControllers = require("./controllers/genreControllers");
const musicStyleControllers = require("./controllers/musicStyleControllers");

router.get("/genres", genreControllers.browse);
router.get("/musicStyles", musicStyleControllers.browse);

router.delete("/games/:id", checkCredentials, gameControllers.destroy);
router.delete("/discs/:id", checkCredentials, discControllers.destroy);

module.exports = router;
