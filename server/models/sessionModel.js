const db = require('../config/db');

const createSession = async (userId, token, expiresAt) => {
  const query = `
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [userId, token, expiresAt]);
  return result.insertId;
};

const getSessionByToken = async (token) => {
  const query = `SELECT * FROM sessions WHERE token = ? AND expires_at > NOW()`;
  const [rows] = await db.query(query, [token]);
  return rows[0];
};

const deleteSession = async (token) => {
  const query = `DELETE FROM sessions WHERE token = ?`;
  await db.query(query, [token]);
};

const cleanExpiredSessions = async () => {
  const query = `DELETE FROM sessions WHERE expires_at <= NOW()`;
  await db.query(query);
};

module.exports = {
  createSession,
  getSessionByToken,
  deleteSession,
  cleanExpiredSessions
};