const AbstractManager = require("./AbstractManager");

class GenreManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "genre" as configuration
    super({ table: "genre" });
  }

  // The C of CRUD - Create operation

  async create(genre) {
    // Execute the SQL INSERT query to add a new genre to the "genre" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [genre.label]
    );

    // Return the ID of the newly inserted genre
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific genre by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the genre
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all genres from the "genre" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of genres
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing genre

  // async update(genre) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an genre by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = GenreManager;
