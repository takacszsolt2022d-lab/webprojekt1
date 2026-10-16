import pool from "../config/db.js";

const UserModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM users");
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    },

    async create(user) {
        const { email, password, name, phone, profileimage, role } = user;
        const [result] = await pool.query("INSERT INTO users (email, password, name, role, phone, profileimage) VALUES (?, ?, ?, ?, ?, ?)", [email, password, name, role || "0", phone || null, profileimage || null]);

        return { id: result.insertId, ...user, role: role || "0" };
    },
};

export default UserModel;
