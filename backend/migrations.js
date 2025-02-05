require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Define Tables
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
        await client.connect();
        console.log('Connected to the database');

        // Create tables
        await client.query(createUserTable);
        console.log('User table created or already exists.');

        await client.query(createPostTable);
        console.log('Post table created or already exists.');

        await client.end();
        console.log('Disconnected from the database');
    } catch (err) {
        console.error('Error running migrations:', err);
        await client.end();
    }
};

runMigrations();
