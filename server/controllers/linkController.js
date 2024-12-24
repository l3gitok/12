const linkModel = require('../models/linkModel');
const analyticsModel = require('../models/analyticsModel');

const addLink = async (req, res) => {
  const { title, url } = req.body;
  const userId = req.user.id;
  
  try {
    const linkId = await linkModel.createLink(userId, title, url);
    res.status(201).json({ message: 'Link created successfully', linkId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  
  try {
    const link = await linkModel.getLinkById(id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    await linkModel.updateLink(id, title, url);

    res.status(200).json({ message: 'Link updated successfully' });
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteLink = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const link = await linkModel.getLinkById(id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    if (link.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    await linkModel.deleteLink(id);
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserLinks = async (req, res) => {
  const userId = req.user.id;
  try {
    const links = await linkModel.getLinksByUserId(userId);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLinkById = async (req, res) => {
  const { id } = req.params;
  try {
    const link = await linkModel.getLinkById(id);
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const trackLinkClick = async (req, res) => {
  const { id } = req.params;
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'];

  try {
    await linkModel.incrementClickCount(id);
    await analyticsModel.trackClick(id, ipAddress, userAgent);
    res.status(200).json({ message: 'Click tracked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLinksByUserId = async (userId) => {
  try {
    const query = 'SELECT * FROM links WHERE user_id = ?';
    const [rows] = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error('Failed to get links by user id');
  }
};

module.exports = {
  addLink,
  updateLink,
  deleteLink,
  getUserLinks,
  getLinkById,
  getLinksByUserId,
  trackLinkClick
};