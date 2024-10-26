// services/weatherService.js
const WeatherModel = require('../models/weatherModel');

exports.processWeatherUpdate = async (data) => {
    // Save incoming weather data
    await WeatherModel.saveWeatherData(data);

    // Calculate daily summary
    const date = new Date(data.dt).toISOString().split('T')[0];
    const summary = await WeatherModel.getDailySummary(date);
    
    if (summary) {
        summary.date = date; // Add the date to the summary
        await WeatherModel.saveDailySummary(summary);
    }
};