// Importer l'accès aux tables de la base de données
const tables = require("../tables");

// Opération de consultation (Lecture de tous les enregistrements)
const browse = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const label = req.query.label || "";

    // Récupérer tous les laserdiscs de la base de données
    const laserdiscs = await tables.laserdisc.readAll(
      req.user.id,
      searchTerm,
      label
    );

    // Répondre avec les laserdiscs au format JSON
    res.status(200).json(laserdiscs);
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de lecture
const read = async (req, res, next) => {
  try {
    // Récupérer un laserdisc spécifique de la base de données en fonction de l'ID fourni
    const laserdisc = await tables.laserdisc.read(req.user.id, req.params.id);

    // Si le laserdisc n'est pas trouvé, répondre avec HTTP 404 (Non trouvé)
    // Sinon, répondre avec le laserdisc au format JSON
    if (laserdisc == null) {
      res.sendStatus(404);
    } else {
      res.json(laserdisc);
    }
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de modification
const edit = async (req, res, next) => {
  // Extraire les données du laserdisc du corps de la requête
  const laserdisc = req.body;

  try {
    // Mettre à jour le laserdisc dans la base de données
    await tables.laserdisc.update(req.user.id, req.params.id, laserdisc);

    // Répondre avec HTTP 204 (Pas de contenu)
    res.sendStatus(204);
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération d'ajout
const add = async (req, res, next) => {
  // Extraire les données du laserdisc du corps de la requête
  const laserdisc = req.body;

  try {
    // Insérer le laserdisc dans la base de données
    const insertId = await tables.laserdisc.create(req.user.id, laserdisc);

    // Répondre avec HTTP 201 (Créé) et l'ID du laserdisc nouvellement inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de suppression
const destroy = async (req, res, next) => {
  try {
    // Supprimer le laserdisc de la base de données en fonction de l'ID fourni
    await tables.laserdisc.delete(req.user.id, req.params.id);

    // Répondre avec HTTP 204 (Pas de contenu)
    res.sendStatus(204);
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Prêt à exporter les fonctions de contrôleur
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
