const AbstractManager = require("./AbstractManager");

class GameManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "game" as configuration
    super({ table: "game" });
  }

  // The C of CRUD - Create operation

  async create(game) {
    // Execute the SQL INSERT query to add a new game to the "game" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, image, year, console, genre_id) values (?, ? , ? , ? , ?)`,
      [game.title, game.image, game.year, game.console, game.genre_id]
    );

    // Return the ID of the newly inserted game
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific game by its ID
    const [rows] = await this.database.query(
      `SELECT game.*, genre.label as genre_label from ${this.table} LEFT JOIN genre ON game.genre_id = genre.id
    WHERE game.id = ?
  `,
      [id]
    );

    // Return the first row of the result, which represents the game
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all games from the "game" table
    const [rows] = await this.database
      .query(`SELECT game.*, genre.label as genre_label 
         FROM ${this.table} 
         LEFT JOIN genre ON game.genre_id = genre.id`);

    // Return the array of games
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing game

  // async update(game) {
  async update(id, game) {
    // Execute the SQL INSERT query to add a new game to the "game" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, image = ?, year = ?, console = ?, genre_id= ? WHERE id = ?`,
      [game.title, game.image, game.year, game.console, game.genre_id, id]
    );

    // Return the ID of the newly inserted game
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(id) {
    try {
      // Execute the SQL DELETE query to delete a specific game by its ID
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
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
