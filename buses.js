const express = require('express');
const db = require('../config');

const router = express.Router();

// Fetch Buses with Filters
router.get('/', (req, res) => {
    const { from, to, date, type } = req.query;

    let query = `SELECT * FROM Buses WHERE from_city = ? AND to_city = ? AND journey_date = ?`;
    const params = [from, to, date];

    if (type && type !== 'all') {
        query += ` AND type = ?`;
        params.push(type);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add New Bus (Admin)
router.post('/add', (req, res) => {
    const { name, fromCity, toCity, journeyDate, fare, type } = req.body;

    const query = `INSERT INTO Buses (name, from_city, to_city, journey_date, fare, type) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, fromCity, toCity, journeyDate, fare, type], (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Bus added successfully!');
    });
});

module.exports = router;
