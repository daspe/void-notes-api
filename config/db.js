// Configure connection to postgresql db using knex
const knex = require('knex');

// Connect to database
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'admin',
        database : 'void-notes'
    }
});

module.exports = db;