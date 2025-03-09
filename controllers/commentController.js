const pool = require('../db');

// Show all comments
const getComments = async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM comments WHERE post_id = $1',
            [postId]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// create a new comment
const createComment = async (req, res) => {
    const { content, username, email, post_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (content, username, email, post_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [content, username || null, email || null, post_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a comment by id
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const postResult = await pool.query(
            'SELECT p.user_id FROM comments c JOIN posts p ON c.post_id = p.id WHERE c.id = $1',
            [id]
        );
        if (postResult.rows.length === 0) {
            return res.status(404).send('Comment not found');
        }
        if (postResult.rows[0].user_id !== req.user.id) {
            return res.status(403).send('Unauthorized');
        }
        await pool.query('DELETE FROM comments WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getComments, createComment, deleteComment };
