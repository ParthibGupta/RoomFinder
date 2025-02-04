const express = require('express');
const { getUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Get current user (ID derived from token)
router.get('/get', authenticateToken, getUser);

module.exports = router;
