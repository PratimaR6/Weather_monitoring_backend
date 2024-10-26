// controllers/weatherController.js
const WeatherService = require('../services/weatherService');

exports.updateWeatherData = async (req, res) => {
    try {
        const weatherData = req.body; // Assuming data comes in the request body
        await WeatherService.processWeatherUpdate(weatherData);
        res.status(200).send('Weather data processed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing weather data');
    }
};