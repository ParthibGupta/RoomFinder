const db = require('../db');

// Create a new post
const createPost = async (req, res) => {
    const { heading, description, photos, rent, location } = req.body;
    const userId = req.user.sub;
    try {
        await db.query(
            `INSERT INTO "Post" (id, heading, description, photos, rent, location, owner_id) 
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)`,
            [heading, description, photos, rent, location, userId]
        );
        res.status(201).send('Post created');
    } catch (err) {
        res.status(500).send('Error creating post');
    }
};

// Update a post
const updatePost = async (req, res) => {
    const postId = req.params.postId;
    const { heading, description, photos, rent, location } = req.body;
    const userId = req.user.sub;
    try {
        const result = await db.query(
            `UPDATE "Post" 
             SET heading = $1, description = $2, photos = $3, rent = $4, location = $5 
             WHERE id = $6 AND owner_id = $7`,
            [heading, description, photos, rent, location, postId, userId]
        );
        if (result.rowCount === 0) return res.status(404).send('Post not found or not authorized');
        res.send('Post updated');
    } catch (err) {
        res.status(500).send('Error updating post');
    }
};

// Get posts by location
const getPostsByLocation = async (req, res) => {
    const { lat, long } = req.body;
    const radius = 10; // 10km radius
    try {
        const posts = await db.query(
            `SELECT * FROM "Post" 
             WHERE earth_distance(ll_to_earth(location[1], location[2]), ll_to_earth($1, $2)) < $3`,
            [lat, long, radius * 1000]
        );
        res.json(posts.rows);
    } catch (err) {
        res.status(500).send('Error fetching posts');
    }
};

// Delete a post
const deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.sub;
    try {
        const result = await db.query('DELETE FROM "Post" WHERE id = $1 AND owner_id = $2', [postId, userId]);
        if (result.rowCount === 0) return res.status(404).send('Post not found or not authorized');
        res.send('Post deleted');
    } catch (err) {
        res.status(500).send('Error deleting post');
    }
};

module.exports = { createPost, updatePost, getPostsByLocation, deletePost };
