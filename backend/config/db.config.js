const mysql2 = require("mysql2");

// Create a connection pool
const dbConnectionPool = mysql2.createPool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    connectionLimit: 10
});

// Create a promise for the pool
const dbConnectionPromise = dbConnectionPool.promise();

console.log(process.env.DB_NAME);

async function query(sql, params) {
    const [rows, fields] = await dbConnectionPromise.execute(sql, params);
    return rows;
}

module.exports = {
    dbConnectionPool,
    dbConnectionPromise,
    query
};
