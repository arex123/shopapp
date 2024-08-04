const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-aditya',
    password: 'Aditya@987'
});

module.exports = pool.promise();