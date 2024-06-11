require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;

// Import db connection (ensure these files are correctly set up)
const { dbConnectionPool, dbConnectionPromise, query } = require('./config/db.config');

// Import router
const router = require("./routes");

// Middleware setup
app.use(express.json());
app.use(cors());

// Route middlewares
app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Export the app
module.exports = app;
