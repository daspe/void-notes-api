// Void-Notes-API
const express = require('express');
const cors = require('cors');

// Import routes
const indexRouter = require('./routes/index');
const vnRouter = require('./routes/vn');

// Express server app
const app = express();

// Express middleware
app.use(express.static('./static')); // dir for static files
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Express router middleware
app.use('/', indexRouter);
app.use('/vn', vnRouter);

// Get port from env variable
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 3001; // default if no port set
}

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
