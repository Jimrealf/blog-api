const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).send('No token provided');
    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Malformed token');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = decoded; // decoded is the payload of the token
        next();
    });
};

module.exports = { verifyToken };
