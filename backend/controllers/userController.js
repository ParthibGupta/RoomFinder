const db = require('../db');

const getUser = async (req, res) => {
    const userId = req.user.sub; // Extract user ID from the authenticated token
    try {
        const user = await db.query('SELECT * FROM "User" WHERE id = $1', [userId]);
        if (user.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).send('Error fetching user');
    }
};

module.exports = { getUser };
