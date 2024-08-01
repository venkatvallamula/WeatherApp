// src/App.js
import React from 'react';
import User from './components/User';
import RealTimeWeather from './components/RealTimeWeather'
import WeatherAlerts from './components/WeatherAlerts';
import InteractiveMap from './components/InteractiveMap';

const App = () => {
  return (
    <div className="App">
      <RealTimeWeather />
      <WeatherAlerts/>
      <InteractiveMap/>
      
    </div>
  );
};

export default App;
