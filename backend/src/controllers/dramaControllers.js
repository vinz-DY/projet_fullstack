// Importer l'accès aux tables de la base de données
const tables = require("../tables");

// Opération de consultation (Lecture de tous les enregistrements)
const browse = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const label = req.query.label || "";

    // Récupérer tous les dramas de la base de données
    const dramas = await tables.drama.readAll(req.user.id, searchTerm, label);

    // Répondre avec les dramas au format JSON
    res.status(200).json(dramas);
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de lecture
const read = async (req, res, next) => {
  try {
    // Récupérer un drama spécifique de la base de données en fonction de l'ID fourni
    const drama = await tables.drama.read(req.user.id, req.params.id);

    // Si le drama n'est pas trouvé, répondre avec HTTP 404 (Non trouvé)
    // Sinon, répondre avec le drama au format JSON
    if (drama == null) {
      res.sendStatus(404);
    } else {
      res.json(drama);
    }
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de modification
const edit = async (req, res, next) => {
  // Extraire les données du drama du corps de la requête
  const drama = req.body;

  try {
    // Mettre à jour le drama dans la base de données
    await tables.drama.update(req.user.id, req.params.id, drama);

    // Répondre avec HTTP 204 (Pas de contenu)
    res.sendStatus(204);
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération d'ajout
const add = async (req, res, next) => {
  // Extraire les données du drama du corps de la requête
  const drama = req.body;

  try {
    // Insérer le drama dans la base de données
    const insertId = await tables.drama.create(req.user.id, drama);

    // Répondre avec HTTP 201 (Créé) et l'ID du drama nouvellement inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    next(err);
  }
};

// Opération de suppression
const destroy = async (req, res, next) => {
  try {
    // Supprimer le drama de la base de données en fonction de l'ID fourni
    await tables.drama.delete(req.user.id, req.params.id);

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
