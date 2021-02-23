const express = require('express');
const cors = require('cors');
const knex = require('knex');

// Import routes
const indexRouter = require('./routes/index');
const nbRouter = require('./routes/nb');

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

// Express router middleware
app.use('/', indexRouter);
app.use('/nb', nbRouter);

// Get port from env variable
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 3001; // default if no port set
}

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
