const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser');
//const weatherRoutes = require('./routes/weatherRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Fetch weather data function
async function fetchWeatherData(location) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${process.env.API_KEY}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error(`Error fetching weather data for ${location}:`, error.response.data);
        } else {
            // The request was made but no response was received
            console.error(`Error fetching weather data for ${location}:`, error.message);
        }
        return null; // Return null to indicate failure
    }
}

// Function to send email alerts
function sendAlert(location, temperature) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Weather Alert for ${location}`,
        text: `Alert! Temperature in ${location} has exceeded the threshold: ${temperature}°C`,
    };
    transporter.sendMail(mailOptions);
}

// Main weather monitoring function
async function monitorWeather() {
    const locations = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    for (const location of locations) {
        const data = await fetchWeatherData(location);
        const temperature = data.main.temp - 273.15; // Convert from Kelvin to Celsius
        const condition = data.weather[0].main;

        // Save to MySQL
        db.query('INSERT INTO weather_data (location, temperature, feels_like, conditiona, timestamp) VALUES (?, ?, ?, ?, ?)', 
            [location, temperature, data.main.feels_like - 273.15, condition, new Date(data.dt * 1000)],
            (err) => {
                if (err) throw err;
            }
        );

        // Check alert condition
        if (temperature > process.env.ALERT_TEMPERATURE_THRESHOLD) {
            sendAlert(location, temperature);
        }
    }
}

// Set interval for monitoring every 5 minutes
setInterval(monitorWeather, 300000); // 300000 ms = 5 minutes
app.get('/api/weather', async (_req, res) => {
    const locations = _req.query.locations ? _req.query.locations.split(',') : ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const weatherData = [];

    for (const location of locations) {
        const data = await fetchWeatherData(location);
        if (data) {
            weatherData.push({
                location,
                temperature: data.main.temp - 273.15, // Convert to Celsius
                feels_like: data.main.feels_like - 273.15,
                condition: data.weather[0].main,
                timestamp: new Date(data.dt * 1000).toLocaleString(),
            });
        }
    }

    res.json(weatherData);
});

app.get('/', (_req, res) => {
    res.send('Welcome to the Weather Monitoring System!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
