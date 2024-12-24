const db = require('../config/db');

const createProfile = async (userId, theme = 'default', backgroundColor = '#FFFFFF', fontColor = '#000000', fontFamily = 'Arial', buttonStyle = 'rounded', backgroundImage = '', logo = '', gradientEnabled = false, gradientStartColor = '#FFFFFF', gradientEndColor = '#000000', gradientDirection = 'to right') => {
  const query = `
    INSERT INTO profiles (user_id, theme, background_color, font_color, font_family, button_style, background_image, logo, gradient_enabled, gradient_start_color, gradient_end_color, gradient_direction)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [userId, theme, backgroundColor, fontColor, fontFamily, buttonStyle, backgroundImage, logo, gradientEnabled, gradientStartColor, gradientEndColor, gradientDirection]);
  return result.insertId;
};

const getProfileByUserId = async (userId) => {
  const query = `
    SELECT * FROM profiles WHERE user_id = ?
  `;
  const [rows] = await db.query(query, [userId]);
  return rows[0];
};

const updateProfileByUserId = async (userId, data) => {
  const query = `
    UPDATE profiles
    SET theme = ?, background_color = ?, font_color = ?, font_family = ?, button_style = ?, background_image = ?, logo = ?, gradient_enabled = ?, gradient_start_color = ?, gradient_end_color = ?, gradient_direction = ?
    WHERE user_id = ?
  `;
  const [result] = await db.query(query, [data.theme, data.background_color, data.font_color, data.font_family, data.button_style, data.background_image, data.logo, data.gradient_enabled, data.gradient_start_color, data.gradient_end_color, data.gradient_direction, userId]);
  return result.affectedRows;
};


module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfileByUserId
};