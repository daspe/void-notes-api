// Configure connection to postgresql db using knex
const knex = require('knex');

// Connect to database
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = db;