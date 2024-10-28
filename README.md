# Weather Monitoring Application - Backend

## Project Overview
The backend of the Weather Monitoring Application is built using Node.js and Express. It serves as the API to fetch real-time weather data for major cities in India from the OpenWeatherMap API, manages database interactions with MySQL, and sends alerts based on user-defined thresholds.

## Technologies Used
- **Node.js**
- **Express**
- **Axios** (for API requests)
- **MySQL** (for data storage)

## Installation

### Prerequisites
- **Node.js**
- **MySQL**
- **Docker** (optional, for containerization)

### Clone the Repository

git clone https://github.com/PratimaR6/Weather_monitoring_backend.git
cd Weather_monitoring_backend
Backend Setup
Navigate to the Backend Directory:

bash
Copy code
cd backend
Install Dependencies:

bash
Copy code
npm install
Create a .env File: Add your MySQL database and OpenWeatherMap API credentials:

plaintext
Copy code
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=weather
OPENWEATHER_API_KEY=your_api_key
Run the Backend Server:


npm start
Usage
The backend server will run on http://localhost:5000.
It provides API endpoints to retrieve weather data and manage alerts.
API Integration
The backend fetches weather data using the OpenWeatherMap API. The endpoint used is:


https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}
API Endpoints
GET /weather: Retrieve weather data for specified coordinates.
POST /alerts: Set alerts based on user-defined temperature thresholds.
Testing
To test the backend:

Ensure your MySQL server is running and connected.
Use tools like Postman or cURL to interact with the API endpoints.
Future Enhancements
User authentication for personalized settings.
Enhanced error handling and logging.
Rate limiting for API requests.
Integration with other weather services for comparison.
