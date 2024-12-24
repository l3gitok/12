const express = require('express');
const router = express.Router();
const { 
  addSocialMediaLink, 
  getSocialMediaLinks,
  updateSocialMediaLink,
  deleteSocialMediaLink 
} = require('../controllers/socialmediaController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, addSocialMediaLink);
router.get('/', authenticate, getSocialMediaLinks);
router.put('/:id', authenticate, updateSocialMediaLink);
router.delete('/:id', authenticate, deleteSocialMediaLink);

module.exports = router;