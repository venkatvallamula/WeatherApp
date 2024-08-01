import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import HistoricalWeather from './HistoricalWeather';

const InteractiveMap = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const apiKey = '24b1a938bb559015612e46405eb47f7d'; 

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLocation({ lat, lng });
    fetchWeatherData(lat, lng);
  };

  return (
    <div>
      <h1>Interactive Weather Map</h1>
      <MapContainer center={location} zoom={5} style={{ height: '500px', width: '100%' }} onClick={handleMapClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {weatherData && (
          <Marker position={location}>
            <Popup>
              <div>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {weatherData && <HistoricalWeather data={weatherData} />}
    </div>
  );
};

export default InteractiveMap;
