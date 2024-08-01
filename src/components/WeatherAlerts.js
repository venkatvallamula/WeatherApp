// src/components/WeatherAlerts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '24b1a938bb559015612e46405eb47f7d';
  const LATITUDE = '37.7749'; // Example: San Francisco latitude
  const LONGITUDE = '-122.4194'; // Example: San Francisco longitude

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}`
        );
        setAlerts(response.data.alerts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [API_KEY, LATITUDE, LONGITUDE]);

  return (
    <div className="weather-alerts">
      <h2>Weather Alerts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h3>{alert.event}</h3>
            <p>{alert.description}</p>
            <p>Start: {new Date(alert.start * 1000).toLocaleString()}</p>
            <p>End: {new Date(alert.end * 1000).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No alerts at the moment.</p>
      )}
    </div>
  );
};

export default WeatherAlerts;
