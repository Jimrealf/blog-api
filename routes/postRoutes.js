const express = require('express');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const { verifyToken } = require('../controllers/auth');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

module.exports = router;
