const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  deleteAccount,
  resetPassword,
  getUserByUsername,
  getUserById,
  verifyEmail 
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.delete('/account', authenticate, deleteAccount);
router.post('/verify-email', authenticate, verifyEmail);
router.post('/reset-password', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.get('/:username', getUserByUsername);
router.get('/user/:id', getUserById);
module.exports = router;