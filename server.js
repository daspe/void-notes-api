const express = require('express');
const cors = require('cors');
const knex = require('knex');

// Import controllers
const notebook = require('./controllers/notebook');

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

// Express server app
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//================================ ROUTES ======================================
app.get('/', (req, res) => { res.send('Success') });
app.get('/nb', (req, res) => { notebook.handleNotebook(req, res, db) });
app.get('/nb/:key', (req, res) => { notebook.handleNotebook(req, res, db) });
app.get('/new', (req, res) => { notebook.handleNewNotebook(req, res, db) });

// Get port from env variable
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 3001; // default if no port set
}

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
