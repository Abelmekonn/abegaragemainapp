require("dotenv").config();
const cors = require("cors");
const express = require("express");
const expressSanitizer = require("express-sanitizer"); // Corrected sanitizer middleware
const app = express();
const port = process.env.PORT;

// Import db connection (ensure these files are correctly set up)
const { dbConnectionPool, dbConnectionPromise, query } = require('./config/db.config');

// set up CORS option to allow request from frontend
const corsOption = {
    origin: process.env.FRONTEND_URL,
    optionSuccessStatus: 200
};

// Import router
const router = require("./routes");

// Add cors middleware
app.use(cors(corsOption));

// Middleware setup
app.use(express.json());

// user sanitization when dealing with data
app.use(expressSanitizer());

// Route middlewares
app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Export the app
module.exports = app;
