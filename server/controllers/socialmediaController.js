const socialMediaModel = require('../models/socialmediaModel');

const addSocialMediaLink = async (req, res) => {
  const userId = req.user.id;
  const { platform, url } = req.body;
  
  try {
    const linkId = await socialMediaModel.addSocialMedia(userId, platform, url);
    res.status(201).json({ 
      message: 'Social media link added successfully',
      linkId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSocialMediaLinks = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const links = await socialMediaModel.getSocialMediaByUserId(userId);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSocialMediaLink = async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;
  
  try {
    await socialMediaModel.updateSocialMedia(id, url);
    res.status(200).json({ message: 'Social media link updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSocialMediaLink = async (req, res) => {
  const { id } = req.params;
  
  try {
    await socialMediaModel.deleteSocialMedia(id);
    res.status(200).json({ message: 'Social media link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSocialMediaLink,
  getSocialMediaLinks,
  updateSocialMediaLink,
  deleteSocialMediaLink
};