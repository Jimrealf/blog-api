const express = require('express');
const {
    getComments,
    createComment,
    deleteComment,
} = require('../controllers/commentController');
const { verifyToken } = require('../controllers/auth');
const router = express.Router();

router.get('/post/:postId', getComments);
router.post('/', createComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
