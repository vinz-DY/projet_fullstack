const AbstractManager = require("./AbstractManager");

class MovieStyleManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "movieStyle" as configuration
    super({ table: "movieStyle" });
  }

  // The C of CRUD - Create operation

  async create(movieStyle) {
    // Execute the SQL INSERT query to add a new movieStyle to the "movieStyle" table
    const [result] = await this.database.query(
      `insert into ${this.table} (label) values (?)`,
      [movieStyle.label]
    );

    // Return the ID of the newly inserted movieStyle
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific movieStyle by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the movieStyle
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all movieStyles from the "movieStyle" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of movieStyles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing movieStyle

  // async update(movieStyle) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an movieStyle by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = MovieStyleManager;
