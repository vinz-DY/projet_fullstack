const AbstractManager = require("./AbstractManager");

class musicStyleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "musicStyle" as configuration
    super({ table: "musicStyle" });
  }

  // The C of CRUD - Create operation

  async create(musicStyle) {
    // Execute the SQL INSERT query to add a new musicStyle to the "musicStyle" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [musicStyle.label]
    );

    // Return the ID of the newly inserted musicStyle
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific musicStyle by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the musicStyle
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all musicStyles from the "musicStyle" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of musicStyles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing musicStyle

  // async update(musicStyle) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an musicStyle by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = musicStyleManager;
