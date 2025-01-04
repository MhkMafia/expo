const express = require('express');
const db = require('../config');

const router = express.Router();

// Book a Seat
router.post('/', (req, res) => {
    const { userId, busId, seatNo } = req.body;

    const query = `
        INSERT INTO Bookings (user_id, bus_id, seat_no)
        VALUES (?, ?, ?)
    `;
    db.query(query, [userId, busId, seatNo], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Booking confirmed!', bookingId: results.insertId });
    });
});

module.exports = router;
