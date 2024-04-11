const AbstractManager = require("./AbstractManager");

class LaserdiscManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "laserdisc" as configuration
    super({ table: "laserdisc" });
  }

  // The C of CRUD - Create operation

  async create(userId, laserdisc) {
    // Exécuter la requête SQL INSERT pour ajouter un nouveau laserdisc à la table "laserdisc"
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (originalMovieTitle, image, year, teaser, movieStyle_id, user_id) VALUES (?, ? , ? , ? , ?, ?)`,
      [
        laserdisc.originalMovieTitle,
        laserdisc.image,
        laserdisc.year,
        laserdisc.teaser,
        laserdisc.movieStyle_id,
        userId,
      ]
    );

    // Retourner l'ID du nouveau laserdisc inséré
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(userId, id) {
    // Execute the SQL SELECT query to retrieve a specific laserdisc by its ID and user ID
    const [rows] = await this.database.query(
      `SELECT laserdisc.*, movieStyle.label as movieStyle_label 
       FROM ${this.table} 
       LEFT JOIN movieStyle ON laserdisc.movieStyle_id = movieStyle.id
       WHERE laserdisc.id = ? AND laserdisc.user_id = ?
      `,
      [id, userId]
    );

    // Return the first row of the result, which represents the laserdisc
    return rows[0];
  }

  async readAll(userId, searchTerm) {
    let query = `SELECT laserdisc.*, movieStyle.label as movieStyle_label 
                 FROM ${this.table} 
                 LEFT JOIN movieStyle ON laserdisc.movieStyle_id = movieStyle.id 
                 WHERE laserdisc.user_id = ?`;
    const params = [userId];

    if (searchTerm) {
      query += ` AND originalMovieTitle LIKE ?`;
      params.push(`%${searchTerm}%`);
      query += " ORDER BY originalMovieTitle ASC";
    } else {
      query += " ORDER BY originalMovieTitle ASC";
      query += " LIMIT 15";
    }

    const [rows] = await this.database.query(query, params);

    // Return the array of movies
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing laserdisc

  // async update(laserdisc) {
  async update(userId, id, laserdisc) {
    // Exécuter la requête SQL UPDATE pour modifier un laserdisc existant dans la table "laserdisc"
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET originalMovieTitle = ?, image = ?, year = ?, teaser = ?, movieStyle_id = ? WHERE id = ? AND user_id = ?`,
      [
        laserdisc.originalMovieTitle,
        laserdisc.image,
        laserdisc.year,
        laserdisc.teaser,
        laserdisc.movieStyle_id,
        id,
        userId,
      ]
    );

    // Retourner l'ID du laserdisc mis à jour
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(userId, id) {
    try {
      // Exécuter la requête SQL DELETE pour supprimer un laserdisc spécifique par son ID et l'ID de l'utilisateur
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
        [id, userId]
      );

      // Vérifier la propriété affectedRows pour vérifier si la suppression a réussi
      if (result && result.affectedRows > 0)
        return { message: "Suppression réussie" };
      return {
        message:
          "laserdisc non trouvé ou vous n'avez pas l'autorisation de le supprimer",
      };
    } catch (error) {
      // Gérer l'erreur, la journaliser, etc.
      console.error(
        "Erreur lors de la suppression du laserdisc:",
        error.message
      );
      return { message: "Erreur lors de la suppression du laserdisc" };
    }
  }
}

module.exports = LaserdiscManager;
