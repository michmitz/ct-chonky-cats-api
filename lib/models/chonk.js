const pool = require('../utils/pool');

module.exports = class Chonk {
  id;
  name;
  weight;
  description;
  imageUrl;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.weight = row.weight;
    this.description = row.description;
    this.imageUrl = row.image_url;
  }

  static async insert(chonk) {
    const { rows } = await pool.query(`
      INSERT into chonks (name, weight, description, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [chonk.name, chonk.weight, chonk.description, chonk.imageUrl]
    );

    return new Chonk(rows[0]);
  }
};
