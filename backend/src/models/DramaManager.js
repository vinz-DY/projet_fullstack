const AbstractManager = require("./AbstractManager");

class dramaManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "drama" as configuration
    super({ table: "drama" });
  }

  // The C of CRUD - Create operation

  async create(userId, drama) {
    // Exécuter la requête SQL INSERT pour ajouter un nouveau drama à la table "drama"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, image, year, teaser, movieStyle_id, user_id) VALUES (?, ? , ? , ? , ?, ?)`,
      [
        drama.title,
        drama.image,
        drama.year,
        drama.teaser,
        drama.movieStyle_id,
        userId,
      ]
    );

    // Retourner l'ID du nouveau drama inséré
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(userId, id) {
    // Execute the SQL SELECT query to retrieve a specific drama by its ID and user ID
    const [rows] = await this.database.query(
      `SELECT drama.*, movieStyle.label as movieStyle_label 
       FROM ${this.table} 
       LEFT JOIN movieStyle ON drama.movieStyle_id = movieStyle.id
       WHERE drama.id = ? AND drama.user_id = ?
      `,
      [id, userId]
    );

    // Return the first row of the result, which represents the drama
    return rows[0];
  }

  async readAll(userId, searchTerm, label) {
    let query = `SELECT drama.*, movieStyle.label as movieStyle_label 
                 FROM ${this.table} 
                 LEFT JOIN movieStyle ON drama.movieStyle_id = movieStyle.id 
                 WHERE drama.user_id = ?`;
    const params = [userId];

    if (searchTerm) {
      query += ` AND title LIKE ?`;
      params.push(`%${searchTerm}%`);
    }

    if (label) {
      query += ` AND movieStyle.label = ?`;
      params.push(label);
    }

    query += " ORDER BY title ASC";

    if (!searchTerm) {
      query += " LIMIT 8";
      // Limite à 8 résultats si aucun terme de recherche n'est spécifié
    }

    const [rows] = await this.database.query(query, params);

    // Return the array of movies
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing drama

  // async update(drama) {
  async update(userId, id, drama) {
    // Exécuter la requête SQL UPDATE pour modifier un drama existant dans la table "drama"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, image = ?, year = ?, teaser = ?, movieStyle_id = ? WHERE id = ? AND user_id = ?`,
      [
        drama.title,
        drama.image,
        drama.year,
        drama.teaser,
        drama.movieStyle_id,
        id,
        userId,
      ]
    );

    // Retourner l'ID du drama mis à jour
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(userId, id) {
    try {
      // Exécuter la requête SQL DELETE pour supprimer un drama spécifique par son ID et l'ID de l'utilisateur
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
        [id, userId]
      );

      // Vérifier la propriété affectedRows pour vérifier si la suppression a réussi
      if (result && result.affectedRows > 0)
        return { message: "Suppression réussie" };
      return {
        message:
          "drama non trouvé ou vous n'avez pas l'autorisation de le supprimer",
      };
    } catch (error) {
      // Gérer l'erreur, la journaliser, etc.
      console.error("Erreur lors de la suppression du drama:", error.message);
      return { message: "Erreur lors de la suppression du drama" };
    }
  }
}

module.exports = dramaManager;
