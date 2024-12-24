const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const sessionModel = require('../models/sessionModel');

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await userModel.getUserByEmailOrUsername(emailOrUsername);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await sessionModel.createSession(user.id, token, expiresAt);

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    await sessionModel.deleteSession(token);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
  logout,
};