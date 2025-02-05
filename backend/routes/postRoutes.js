const express = require('express');
const {
    createPost,
    updatePost,
    getPostsByLocation,
    getAllPosts,
    deletePost,
    getPostById
} = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createPost);
router.put('/update/:postId', authenticateToken, updatePost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePost);

module.exports = router;
