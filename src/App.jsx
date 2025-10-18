import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import TopControls from './components/TopControls.jsx';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [tempUnit, setTempUnit] = useState('C');
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  //convert temperature based on selected unit
  const convertTemp = (temp) => {
    return tempUnit === 'F' ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
  };

  //fetch weather by city name from API
  const fetchWeather = async (searchCity) => {
    const q = searchCity ?? city;
    if (!q) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      setCity(data.name);
      setLastUpdated(new Date());

      setRecentSearches((prev) => {
        const updated = [data.name, ...prev.filter((s) => s !== data.name)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  //fetch weather for a specific city from recent searches
  const fetchWeatherByCity = (cityName) => {
    fetchWeather(cityName);
  };

  //fetch weather using browser's geolocation
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
            setLastUpdated(new Date());

            setRecentSearches((prev) => {
              const updated = [data.name, ...prev.filter((s) => s !== data.name)];
              return updated.slice(0, 5);
            });
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

  // Handle Refresh
  const handleRefresh = () => {
    if (weather) {
      fetchWeather(weather.name);
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

        {/* Top Controls - Timestamp, Refresh, Temp toggle */}
        {weather && (
          <TopControls 
            lastUpdated={lastUpdated}
            onRefresh={handleRefresh}
            loading={loading}
            weather={weather}
            tempUnit={tempUnit}
            onTempUnitChange={setTempUnit}
          />
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches}
            onSearchClick={fetchWeatherByCity}
            loading={loading}
          />
        )}

        {/* Search Bar */}
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={() => fetchWeather()}
          onLocationClick={fetchCurrentLocation}
          loading={loading}
        />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Card */}
        {weather && !loading && (
          <WeatherCard 
            weather={weather}
            tempUnit={tempUnit}
            convertTemp={convertTemp}
        />
        )}
      </div>
    </div>
  );
}

export default App;