const express = require('express');
const db = require('../config');

const router = express.Router();

// Fetch Booked Seats for a Bus
router.get('/:busId', (req, res) => {
    const { busId } = req.params;

    const query = `SELECT seat_no FROM Bookings WHERE bus_id = ?`;
    db.query(query, [busId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results.map(row => row.seat_no));
    });
});

// Book a Seat
router.post('/', (req, res) => {
    const { userId, busId, seatNo } = req.body;

    const checkQuery = `SELECT * FROM Bookings WHERE bus_id = ? AND seat_no = ?`;
    db.query(checkQuery, [busId, seatNo], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).send('Seat is already booked!');
        }

        const insertQuery = `INSERT INTO Bookings (user_id, bus_id, seat_no) VALUES (?, ?, ?)`;
        db.query(insertQuery, [userId, busId, seatNo], (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Booking successful!');
        });
    });
});

module.exports = router;
