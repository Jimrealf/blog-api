const pool = require('../db');

// Show all posts
const getPosts = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM posts WHERE published = true'
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Show a post by id
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM posts WHERE id = $1 AND published = true',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Create a new post
const createPost = async (req, res) => {
    const { title, content, published } = req.body;
    const userId = req.user.id;
    if (!title || !content)
        return res.status(400).send('Missing title or content');
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, content, published, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, published || false, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update a post by id
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    try {
        const result = await pool.query(
            'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [title, content, published, id, req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete a post by id
const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = await pool.query(
            'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Post not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
