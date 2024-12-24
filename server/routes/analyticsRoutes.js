const express = require('express');
const router = express.Router();
const { getLinkAnalytics, getUserAnalytics } = require('../controllers/analyticsController');
const  authenticate  = require('../middlewares/authMiddleware');

router.get('/links/:linkId', authenticate, getLinkAnalytics);
router.get('/user', authenticate, getUserAnalytics);

module.exports = router;