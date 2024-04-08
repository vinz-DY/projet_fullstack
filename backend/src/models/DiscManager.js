const AbstractManager = require("./AbstractManager");

class discManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "disc" as configuration
    super({ table: "disc" });
  }

  // The C of CRUD - Create operation

  async create(disc) {
    // Execute the SQL INSERT query to add a new disc to the "disc" table
    const [result] = await this.database.query(
      `insert into ${this.table} (artist, title, image, year, color, musicStyle_id) values (?, ? , ? , ? , ?, ?)`,
      [
        disc.artist,
        disc.title,
        disc.image,
        disc.year,
        disc.color,
        disc.musicStyle_id,
      ]
    );

    // Return the ID of the newly inserted disc
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific disc by its ID
    const [rows] = await this.database.query(
      `SELECT disc.*, musicStyle.label as musicStyle_label from ${this.table} LEFT JOIN musicStyle ON disc.musicStyle_id = musicStyle.id
    WHERE disc.id = ?
  `,
      [id]
    );

    // Return the first row of the result, which represents the disc
    return rows[0];
  }

  // async readAll() {
  //   // Execute the SQL SELECT query to retrieve all discs from the "disc" table
  //   const [rows] = await this.database
  //     .query(`SELECT disc.*, musicStyle.label as musicStyle_label
  //        FROM ${this.table}
  //        LEFT JOIN musicStyle ON disc.musicStyle_id = musicStyle.id`);

  //   // Return the array of discs
  //   return rows;
  // }

  async readAll(searchTerm) {
    let query = `SELECT * FROM ${this.table}`;
    let params = [];

    if (searchTerm) {
      query += ` WHERE artist LIKE ?`;
      params = [`%${searchTerm}%`];
    } else {
      query += " LIMIT 15";
    }

    const [rows] = await this.database.query(query, params);

    // Return the array of cars
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing disc

  // async update(disc) {
  async update(id, disc) {
    // Execute the SQL INSERT query to add a new disc to the "disc" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET artist = ?, title = ?, image = ?, year = ?, color = ?, musicStyle_id= ? WHERE id = ?`,
      [
        disc.artist,
        disc.title,
        disc.image,
        disc.year,
        disc.color,
        disc.musicStyle_id,
        id,
      ]
    );

    // Return the ID of the newly inserted disc
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(id) {
    try {
      // Execute the SQL DELETE query to delete a specific disc by its ID
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      );

      // Check the affectedRows property to verify if the deletion was successful
      if (result && result.affectedRows > 0)
        return { message: "Delete successful" };
      return { message: "disc not found" };
    } catch (error) {
      // Handle the error, log it, etc.
      console.error("Error deleting disc:", error.message);
      return { message: "Error deleting disc" };
    }
  }

  // TODO: Implement the delete operation to remove an disc by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = discManager;
