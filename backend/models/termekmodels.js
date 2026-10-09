import pool from '../config/db.js';

const termekmodels = {
  async getAllTermek() {
    const [rows] = await pool.query('SELECT * FROM termekek');
    return rows;
  },
  
  async getbyId(id) {
    const [rows] = await pool.query('SELECT * FROM termekek WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async createTermek(termek) {
    try {
      const { name, price, description } = termek;
      const [result] = await pool.query('INSERT INTO termekek (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
      return { id: result.insertId, ...termek };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updateTermek(id, termek) {
    try {
      const { name, price, description } = termek;
      await pool.query('UPDATE termekek SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, id]);
      return { id, ...termek };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deleteTermek(id) {
    try {
      await pool.query('DELETE FROM termekek WHERE id = ?', [id]);
    } catch (error) {
      console.error(error);
      throw error;
    }
    return { message: 'Termék törölve' };
  }


};




export default termekmodels;