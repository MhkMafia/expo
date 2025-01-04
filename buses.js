const express = require('express');
const db = require('../config');

const router = express.Router();

// Fetch Available Buses
router.get('/', (req, res) => {
    const { from, to, date } = req.query;

    const query = `
        SELECT * FROM Buses
        WHERE from_city = ? AND to_city = ? AND journey_date = ?
    `;
    db.query(query, [from, to, date], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
