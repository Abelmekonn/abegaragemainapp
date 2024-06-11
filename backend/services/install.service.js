// Import query function 
const conn = require("../config/db.config");
// Import the fs module to read the SQL file
const fs = require('fs');

// Write a function to create the database tables
async function install() {
    // Create a variable to hold the path of the SQL file
    const queryFile = __dirname + '/sql/initial-queries.sql';
    
    // Read the SQL file
    let queries = [];
    let finalMessage = {};
    let templine = '';

    // Ensure the file exists before reading
    if (!fs.existsSync(queryFile)) {
        return {
            message: "SQL file does not exist",
            status: 500
        };
    }

    const lines = fs.readFileSync(queryFile, 'utf-8').split('\n');

    const executed = await new Promise((resolve, reject) => {
        lines.forEach((line) => {
            if (line.trim().startsWith('--') || line.trim() === '') {
                return;
            }
            templine += line;
            if (line.trim().endsWith(';')) {
                const sqlQuery = templine.trim();
                queries.push(sqlQuery);
                templine = '';
            }
        });
        resolve("Queries are added to the list");
    });

    for (let i = 0; i < queries.length; i++) {
        try {
            const result = await conn.query(queries[i]);
            console.log("Table created or modified");
        } catch (err) {
            console.error("Error executing query:", queries[i], err);
            finalMessage.message = "Not all tables are created";
        }
    }

    // Prepare the final message to return to controller
    if (!finalMessage.message) {
        finalMessage.message = "All tables are created";
        finalMessage.status = 200;
    } else {
        finalMessage.status = 500;
    }

    // Return the final message
    return finalMessage;
}

// Export the install function
module.exports = { install };
