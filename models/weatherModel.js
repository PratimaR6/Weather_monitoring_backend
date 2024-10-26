// models/weatherModel.js
const db = require('../db');

module.exports = {
    saveWeatherData: (data) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO weather_data (city, temp, feels_like, condition, dt) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [data.city, data.temp, data.feels_like, data.condition, data.dt], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    getDailySummary: (date) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT AVG(temp) AS avg_temp, MAX(temp) AS max_temp, MIN(temp) AS min_temp, condition AS dominant_condition FROM weather_data WHERE DATE(dt) = ? GROUP BY condition ORDER BY COUNT(*) DESC LIMIT 1';
            db.query(query, [date], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    },
    saveDailySummary: (summary) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO daily_summaries (date, avg_temp, max_temp, min_temp, dominant_condition) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE avg_temp = ?, max_temp = ?, min_temp = ?, dominant_condition = ?';
            db.query(query, [summary.date, summary.avg_temp, summary.max_temp, summary.min_temp, summary.dominant_condition, summary.avg_temp, summary.max_temp, summary.min_temp, summary.dominant_condition], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
};