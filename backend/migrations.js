require('dotenv').config();
const db = require('./db');

const createUserTable = `
    CREATE TABLE IF NOT EXISTS "User" (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        phone VARCHAR
    );
`;

const createPostTable = `
    CREATE TABLE IF NOT EXISTS "Post" (
        id VARCHAR PRIMARY KEY,
        heading VARCHAR NOT NULL,
        description TEXT NOT NULL,
        photos TEXT[],
        rent NUMERIC[],
        location DECIMAL[], -- latitude and longitude
        owner_id VARCHAR NOT NULL,
        fullAddress VARCHAR,
        owner_name VARCHAR,
        suburb VARCHAR
    );
`;

const runMigrations = async () => {
    try {
        // Create tables
        await db.query(createUserTable);
        console.log('User table created or already exists.');

        await db.query(createPostTable);
        console.log('Post table created or already exists.');

    } catch (err) {
        console.error('Error running migrations:', err);
        await db.end();
    }
};

runMigrations();
