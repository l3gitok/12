const db = require('../config/db');

const createUser = async (username, email, password, googleId = null) => {
  const query = `
    INSERT INTO users (username, email, password, google_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [username, email, password, googleId]);
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.query(query, [email]);
  return rows[0];
};

const getUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

const getUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  const [rows] = await db.query(query, [username]);
  return rows[0];
};

const updateUser = async (id, data) => {
  const query = `
    UPDATE users 
    SET username = ?, email = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  await db.query(query, [data.username, data.email, id]);
};

const verifyEmail = async (id) => {
  const query = `UPDATE users SET email_verified = true WHERE id = ?`;
  await db.query(query, [id]);
};
const getUserByEmailOrUsername = async (emailOrUsername) => {
  const query = `SELECT * FROM users WHERE email = ? OR username = ?`;
  const [rows] = await db.query(query, [emailOrUsername, emailOrUsername]);
  return rows[0];
};
const updateUserPassword = async (id, password) => {
  const query = `UPDATE users SET password = ? WHERE id = ?`;
  await db.query(query, [password, id]);
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
  getUserByEmailOrUsername,
  updateUserPassword,
  verifyEmail
};