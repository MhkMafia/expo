const express = require('express');
const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.get('/test', exampleController.test);

module.exports = router;
