const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.AUTH0_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user; // Attach decoded user data to the request object
        next();
    });
};

module.exports = { authenticateToken };
