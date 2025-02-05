const { error } = require('winston');
const db = require('../db');
const logger = require('../logger');

const createPost = async (req, res) => {
    //HAVE TO FIX THE VULNERABILITY HERE, USERID NEEDS TO BE RETRIEVED FROM HEADER THROUGH AUTHENTICATED ROUTE
    const { heading, description, photos, rent, location, owner_id, owner_name, suburb, full_address } = req.body;
    console.log('Request Body:', req.body);

    if(!owner_id){
        return res.status(400).json({ error: 'owner_id is required' });
    }

    try {
        console.log('Owner ID:', req.body.owner_id);
        await db.query(
            `INSERT INTO "Post" (id, heading, description, photos, rent, location, owner_id, fullAddress, owner_name, suburb) 
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [heading, description, photos, rent, location, owner_id, full_address, owner_name, suburb]
        );
        res.status(201).send('Post created');
    } catch (err) {

        logger.error(err)
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
        logger.error('Error creating post:', err); 
        res.status(500).send('Error fetching posts');
    }
};

const getAllPosts = async (req, res) => {
    const { lat, long } = req.body;
    const radius = 10; // 10km radius
    try {
        const posts = await db.query(
            `SELECT * FROM "Post" `
        );
        res.json(posts.rows);
    } catch (err) {
        logger.error('Error creating post:', err); 
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
        logger.error('Error creating post:', err); 
        res.status(500).send('Error deleting post');
    }
};

// Get post by ID
const getPostById = async (req, res) => {
    const postId = req.params.postId; // Extract the postId from the route parameter
    try {
        const result = await db.query(
            `SELECT * FROM "Post" WHERE id = $1`,
            [postId]
        );
        if (result.rowCount === 0) return res.status(404).send('Post not found');
        res.json(result.rows[0]); // Send the post data as a response
    } catch (err) {
        logger.error('Error fetching post by ID:', err);
        res.status(500).send('Error fetching post');
    }
};


module.exports = { createPost, updatePost, getPostsByLocation, deletePost, getAllPosts, getPostById };
