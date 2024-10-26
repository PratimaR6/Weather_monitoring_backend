// routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.post('/update', weatherController.updateWeatherData);

module.exports = router;