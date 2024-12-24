const db = require('../config/db');

const addSocialMedia = async (userId, platform, url) => {
  const query = `
    INSERT INTO social_media (user_id, platform, url)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [userId, platform, url]);
  return result.insertId;
};

const getSocialMediaByUserId = async (userId) => {
  const query = `SELECT * FROM social_media WHERE user_id = ?`;
  const [rows] = await db.query(query, [userId]);
  return rows;
};

const updateSocialMedia = async (id, url) => {
  const query = `UPDATE social_media SET url = ? WHERE id = ?`;
  await db.query(query, [url, id]);
};

const deleteSocialMedia = async (id) => {
  const query = `DELETE FROM social_media WHERE id = ?`;
  await db.query(query, [id]);
};

module.exports = {
  addSocialMedia,
  getSocialMediaByUserId,
  updateSocialMedia,
  deleteSocialMedia
};