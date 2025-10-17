import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

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
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
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

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error('Unable to fetch weather for your location.');
            }

            const data = await response.json();
            setWeather(data);
            setCity(data.name);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          setError('Location access denied. Please enable it and try again.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-2 drop-shadow-lg">
            Weather Dashboard
          </h1>
        </div>

        {/* Search Bar */}
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={fetchWeather}
          onLocationClick={fetchCurrentLocation}
          loading={loading}
        />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Card */}
        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;