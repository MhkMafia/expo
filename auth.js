const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config');

const router = express.Router();

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) return res.status(400).send('Email already registered.');
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('User registered successfully!');
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found.');
        const validPassword = await bcrypt.compare(password, results[0].password);
        if (!validPassword) return res.status(401).send('Invalid credentials.');
        const token = jwt.sign({ id: results[0].user_id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
