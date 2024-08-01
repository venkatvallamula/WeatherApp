import React from 'react';

const HistoricalWeather = ({ data }) => {
  return (
    <div className="weather-details">
      <h2>Weather Data for {new Date(data.current.dt * 1000).toLocaleDateString()}</h2>
      <p>Temperature: {data.current.temp}°C</p>
      <p>Weather: {data.current.weather[0].description}</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>Wind Speed: {data.current.wind_speed} m/s</p>
    </div>
  );
};

export default HistoricalWeather;
