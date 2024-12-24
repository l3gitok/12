const analyticsModel = require('../models/analyticsModel');

const getLinkAnalytics = async (req, res) => {
  const { linkId } = req.params;
  
  try {
    const stats = await analyticsModel.getLinkStats(linkId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserAnalytics = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const stats = await analyticsModel.getUserStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLinkAnalytics,
  getUserAnalytics
};