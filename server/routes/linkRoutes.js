// filepath: /server/routes/linkRoutes.js
const express = require('express');
const router = express.Router();
const { 
  addLink, 
  updateLink, 
  deleteLink, 
  getUserLinks, 
  trackLinkClick,
  getLinksByUserId,
  getLinkById
} = require('../controllers/linkController');
const  authenticate  = require('../middlewares/authMiddleware');
router.get('/:userId', getLinksByUserId);

router.post('/', authenticate, addLink);
router.get('/', authenticate, getUserLinks);
router.get('/:id', getLinkById);
router.put('/:id', authenticate, updateLink);
router.delete('/:id', authenticate, deleteLink);
router.post('/:id/click', trackLinkClick);

module.exports = router;