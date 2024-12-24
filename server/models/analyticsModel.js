const db = require('../config/db');

const trackClick = async (linkId, ipAddress, userAgent) => {
  const query = `
    INSERT INTO analytics (link_id, ip_address, user_agent)
    VALUES (?, ?, ?)
  `;
  await db.query(query, [linkId, ipAddress, userAgent]);
};

const getLinkStats = async (linkId) => {
  const query = `
    SELECT DATE(timestamp) as date, COUNT(*) as clicks
    FROM analytics
    WHERE link_id = ?
    GROUP BY DATE(timestamp)
    ORDER BY date DESC
  `;
  const [rows] = await db.query(query, [linkId]);
  return rows;
};

const getUserStats = async (userId) => {
  const query = `
    SELECT l.title, COUNT(a.id) as total_clicks
    FROM links l
    LEFT JOIN analytics a ON l.id = a.link_id
    WHERE l.user_id = ?
    GROUP BY l.id
  `;
  const [rows] = await db.query(query, [userId]);
  return rows;
};

module.exports = {
  trackClick,
  getLinkStats,
  getUserStats
};