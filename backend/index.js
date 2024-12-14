

// backend/index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const contactRoute=require('./Routes/contactRoute');

require('dotenv').config();
require('./Models/db'); // Ensure DB connection is handled here

const PORT = process.env.PORT || 8080;

// Set up CORS with options to allow requests from the frontend
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,               // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Optional

// Routes
app.use('/auth', AuthRouter);
app.use('/api',contactRoute);

// Ping route for testing
app.get('/ping', (req, res) => {
    res.send('pong');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
