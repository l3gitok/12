const profileModel = require('../models/profileModel');

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { theme, backgroundColor, fontColor, fontFamily, buttonStyle, backgroundImage, logo, gradientEnabled, gradientStartColor, gradientEndColor, gradientDirection } = req.body;

  try {
    await profileModel.updateProfileByUserId(userId, {
      theme,
      backgroundColor,
      fontColor,
      fontFamily,
      buttonStyle,
      backgroundImage,
      logo,
      gradientEnabled,
      gradientStartColor,
      gradientEndColor,
      gradientDirection
    });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await profileModel.getProfileByUserId(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProfileByUserIdController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateProfile,
  getProfileByUserIdController,
  getProfile
};