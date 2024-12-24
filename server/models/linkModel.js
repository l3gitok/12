const db = require('../config/db');

const createLink = async (userId, title, url) => {
  const query = `
    INSERT INTO links (user_id, title, url)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [userId, title, url]);
  return result.insertId;
};

const getLinksByUserId = async (userId) => {
  const query = `SELECT * FROM links WHERE user_id = ?`;
  const [rows] = await db.query(query, [userId]);
  return rows;
};

const getLinkById = async (id) => {
  const query = `SELECT * FROM links WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

const updateLink = async (id, title, url) => {
  const query = `
    UPDATE links 
    SET title = ?, url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  try {
    await db.query(query, [title, url, id]);
  } catch (error) {
    console.error('Error updating link in database:', error);
    throw error;
  }
};

const deleteLink = async (id) => {
  const query = `DELETE FROM links WHERE id = ?`;
  try {
    await db.query(query, [id]);
  } catch (error) {
    console.error('Error deleting link in database:', error);
    throw error;
  }
};

const incrementClickCount = async (id) => {
  const query = `
    UPDATE links 
    SET click_count = click_count + 1 
    WHERE id = ?
  `;
  try {
    await db.query(query, [id]);
  } catch (error) {
    console.error('Error incrementing click count in database:', error);
    throw error;
  }
};

module.exports = {
  createLink,
  getLinksByUserId,
  getLinkById,
  updateLink,
  deleteLink,
  incrementClickCount
};