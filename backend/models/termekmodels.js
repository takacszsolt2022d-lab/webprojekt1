import pool from '../config/db.js';

const TermekModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM termekek');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM termekek WHERE id = ?', [id]);
    return rows[0];
  },

  async create(termek) {
    const { nev, ar, keszlet } = termek;
    const [result] = await pool.query(
      'INSERT INTO termekek (nev, ar, keszlet) VALUES (?, ?, ?)',
      [nev, ar, keszlet]
    );

    return { id: result.insertId, ...termek };
  },

  async update(id, termek) {
    const { nev, ar, keszlet } = termek;
    await pool.query(
      'UPDATE termekek SET nev = ?, ar = ?, keszlet = ? WHERE id = ?',
      [nev, ar, keszlet, id]
    );

    return { id, ...termek };
  },

  async delete(id) {
    await pool.query('DELETE FROM termekek WHERE id = ?', [id]);
    return true;
  },
};

export default TermekModel;