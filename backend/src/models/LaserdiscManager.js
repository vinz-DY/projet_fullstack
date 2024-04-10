const AbstractManager = require("./AbstractManager");

class LaserdiscManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "laserdisc" as configuration
    super({ table: "laserdisc" });
  }

  // The C of CRUD - Create operation

  async create(laserdisc) {
    // Execute the SQL INSERT query to add a new laserdisc to the "laserdisc" table
    const [result] = await this.database.query(
      `insert into ${this.table} (originalMovieTitle, image, year, teaser, movieStyle_id) values (?, ? , ? , ? , ?)`,
      [
        laserdisc.originalMovieTitle,
        laserdisc.image,
        laserdisc.year,
        laserdisc.teaser,
        laserdisc.movieStyle_id,
      ]
    );

    // Return the ID of the newly inserted laserdisc
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific laserdisc by its ID
    const [rows] = await this.database.query(
      `SELECT laserdisc.*, movieStyle.label as movieStyle_label from ${this.table} LEFT JOIN movieStyle ON laserdisc.movieStyle_id = movieStyle.id
    WHERE laserdisc.id = ?
  `,
      [id]
    );

    // Return the first row of the result, which represents the laserdisc
    return rows[0];
  }

  async readAll(searchTerm) {
    let query = `SELECT laserdisc.*, movieStyle.label as movieStyle_label FROM ${this.table} LEFT JOIN movieStyle ON laserdisc.movieStyle_id = movieStyle.id`;
    let params = [];

    if (searchTerm) {
      query += ` WHERE originalMovieTitle LIKE ?`;
      params = [`%${searchTerm}%`];
    } else {
      query += " LIMIT 15";
    }

    const [rows] = await this.database.query(query, params);

    // Return the array of cars
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing laserdisc

  // async update(laserdisc) {
  async update(id, laserdisc) {
    // Execute the SQL INSERT query to add a new laserdisc to the "laserdisc" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET originalMovieTitle = ?, image = ?, year = ?, teaser = ?, movieStyle_id= ? WHERE id = ?`,
      [
        laserdisc.originalMovieTitle,
        laserdisc.image,
        laserdisc.year,
        laserdisc.teaser,
        laserdisc.movieStyle_id,
        id,
      ]
    );

    // Return the ID of the newly inserted laserdisc
    return result.insertId;
  }
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(id) {
    try {
      // Execute the SQL DELETE query to delete a specific laserdisc by its ID
      const result = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      );

      // Check the affectedRows property to verify if the deletion was successful
      if (result && result.affectedRows > 0)
        return { message: "Delete successful" };
      return { message: "laserdisc not found" };
    } catch (error) {
      // Handle the error, log it, etc.
      console.error("Error deleting laserdisc:", error.message);
      return { message: "Error deleting laserdisc" };
    }
  }

  // TODO: Implement the delete operation to remove an laserdisc by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = LaserdiscManager;
