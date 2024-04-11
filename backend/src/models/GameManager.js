const AbstractManager = require("./AbstractManager");

class GameManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "game" as configuration
    super({ table: "game" });
  }

  // The C of CRUD - Create operation

  async create(userId, game) {
    // Execute the SQL INSERT query to add a new game to the "game" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, image, year, console, genre_id, user_id) values (?, ? , ? , ? , ?, ?)`,
      [game.title, game.image, game.year, game.console, game.genre_id, userId]
    );

    // Return the ID of the newly inserted game
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(userId, id) {
    // Execute the SQL SELECT query to retrieve a specific game by its ID
    const [rows] = await this.database.query(
      `SELECT game.*, genre.label as genre_label from ${this.table} LEFT JOIN genre ON game.genre_id = genre.id
    WHERE game.id = ? AND game.user_id = ?
  `,
      [id, userId]
    );

    // Return the first row of the result, which represents the game
    return rows[0];
  }

  async readAll(userId, searchTerm) {
    let query = `SELECT game.*, genre.label as genre_label FROM ${this.table} LEFT JOIN genre ON game.genre_id = genre.id WHERE game.user_id = ?`;
    const params = [userId];

    if (searchTerm) {
      query += ` WHERE title LIKE ?`;
      params.push = [`%${searchTerm}%`];
    } else {
      query += " LIMIT 8";
    }

    const [rows] = await this.database.query(query, params);

    // Return the array of cars
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing game

  // async update(game) {
  async update(userId, id, game) {
    // Execute the SQL INSERT query to add a new game to the "game" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, image = ?, year = ?, console = ?, genre_id= ? WHERE id = ? AND user_id = ?`,
      [
        game.title,
        game.image,
        game.year,
        game.console,
        game.genre_id,
        id,
        userId,
      ]
    );

    // Return the ID of the newly inserted game
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(userId, id) {
    try {
      // Execute the SQL DELETE query to delete a specific game by its ID
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
        [id, userId]
      );

      // Check the affectedRows property to verify if the deletion was successful
      if (result && result.affectedRows > 0)
        return { message: "Delete successful" };
      return { message: "Game not found" };
    } catch (error) {
      // Handle the error, log it, etc.
      console.error("Error deleting game:", error.message);
      return { message: "Error deleting game" };
    }
  }

  // TODO: Implement the delete operation to remove an game by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = GameManager;
