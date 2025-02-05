const { Client } = require('pg');

const db = new Client({
    connectionString: process.env.DATABASE_URL,
});

db.connect()
    .then(() => console.log('Connected to NeonDB'))
    .catch((err) => console.error('Database connection error:', err));

module.exports = db;
