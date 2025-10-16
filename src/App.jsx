import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;   
    }

    setLoading(true);
    setError(null);
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);

    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-info" style={{ 
    textAlign: 'center', 
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    margin: '20px'
  }}>
    <h2>{weather.name}, {weather.sys.country}</h2>
    
    {/* Weather Icon */}
    <img 
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      style={{ width: '100px', height: '100px' }}
    />
    
    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {Math.round(weather.main.temp)} °C
    </p>
    <p style={{ textTransform: 'capitalize' }}>
      {weather.weather[0].description}
    </p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} m/s</p>
  </div>
)}
      </div>
  );
}

export default App;