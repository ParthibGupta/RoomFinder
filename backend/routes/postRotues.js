const express = require('express');
const {
    createPost,
    updatePost,
    getPostsByLocation,
    deletePost,
} = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createPost);
router.put('/update/:postId', authenticateToken, updatePost);
router.get('/', getPostsByLocation);
router.delete('/:postId', authenticateToken, deletePost);

module.exports = router;
