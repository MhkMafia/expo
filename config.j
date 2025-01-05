const mysql = require('mysql');

// Database Configuration
const db = mysql.createConnection({
    host: 'localhost',         // Replace with your database host (e.g., 'localhost')
    user: 'root',              // Replace with your MySQL username
    password: '',              // Replace with your MySQL password
    database: 'galactic_rides' // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the process if there's a connection error
    }
    console.log('Database connected successfully!');
});

module.exports = db;
