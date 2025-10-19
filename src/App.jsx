import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingState from './components/LoadingState.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import RecentSearches from './components/RecentSearches.jsx';
import ForecastCard from './components/ForecastCard.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

// Custom cities with coordinates for Savannah Region
const CUSTOM_CITIES = {
  'damongo': {
    name: 'Damongo',
    lat: 9.0849980,
    lon: -1.8184821,
    country: 'GH',
    region: 'Savannah Region'
  },
  'damango': {
    name: 'Damango',
    lat: 9.0849980,
    lon: -1.8184821,
    country: 'GH',
    region: 'Savannah Region'
  },
  'daboya': {
    name: 'Daboya',
    lat: 9.530739,
    lon: -1.382644,
    country: 'GH',
    region: 'Savannah Region'
  },
  'kpembi': {
    name: 'Kpembi',
    lat: 8.532086,
    lon: -0.496578,
    country: 'GH',
    region: 'Savannah Region'
  },
  'yapei': {
    name: 'Yapei',
    lat: 9.148458,
    lon: -1.151949,
    country: 'GH',
    region: 'Savannah Region'
  },
  'buipe': {
    name: 'Buipe',
    lat: 8.789266,
    lon: -1.468189,
    country: 'GH',
    region: 'Savannah Region'
  },
  'sawla': {
    name: 'Sawla',
    lat: 9.272644,
    lon: -2.413974,
    country: 'GH',
    region: 'Savannah Region'
  },
  'busunu': {
    name: 'Busunu',
    lat: 9.165508,
    lon: -1.507019,
    country: 'GH',
    region: 'Savannah Region'
  },
  'kpalbe': {
    name: 'Kpalbe',
    lat: 9.1150705,
    lon: -0.5529441,
    country: 'GH',
    region: 'Savannah Region'
  }
}

// Process forecast data into daily summaries
const processForecastData = (forecastData) => {
  const dailyForecasts = {};

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = {
        date: date,
        temps: [item.main.temp],
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        pressure: item.main.pressure,
        icon: item.weather[0].icon,
        description: item.weather[0].main.toLowerCase()
      };
    } else {
      dailyForecasts[day].temps.push(item.main.temp);
    }
  });

  // Convert to array and get first 5 days
  return Object.values(dailyForecasts).slice(0, 5).map((day) => ({
    date: day.date,
    temp_max: Math.max(...day.temps),
    temp_min: Math.min(...day.temps),
    humidity: day.humidity,
    wind_speed: day.wind_speed,
    pressure: day.pressure,
    icon: day.icon,
    description: day.description
  }));
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [tempUnit, setTempUnit] = useState('C');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cityRegion, setCityRegion] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Load last searched city from localStorage on app startup
  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

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
      const customCity = CUSTOM_CITIES[q.toLowerCase()];
      let url;

      if (customCity) {
        // Use coordinates for custom cities
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${customCity.lat}&lon=${customCity.lon}&appid=${API_KEY}&units=metric`;
        setCityRegion(customCity.region);
      } else {
        // Search by city name for other cities
        url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
        setCityRegion(null);
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found. Please check spelling and try again.');
      }

      const data = await response.json();
      
      // Override city name if custom city
      if (customCity) {
        data.name = customCity.name;
      }
      
      setWeather(data);
      
      // Set city name to custom name if available, otherwise use API response
      const cityName = customCity ? customCity.name : data.name;
      setCity(cityName);
      setLastUpdated(new Date());

      // Save city to localStorage
      localStorage.setItem('lastSearchedCity', cityName);

      setRecentSearches((prev) => {
        const updated = [cityName, ...prev.filter((s) => s !== cityName)];
        return updated.slice(0, 5);
      });

      // Fetch forecast data
      try {
        let forecastUrl;
        if (customCity) {
          forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${customCity.lat}&lon=${customCity.lon}&appid=${API_KEY}&units=metric`;
        } else {
          forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`;
        }
        
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          const processedForecast = processForecastData(forecastData);
          setForecast(processedForecast);
        }
      } catch (err) {
        console.log('Forecast data not available');
        setForecast(null);
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setCityRegion(null);
      setForecast(null);
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
            setCityRegion(null);

            // Save city to localStorage
            localStorage.setItem('lastSearchedCity', data.name);

            setRecentSearches((prev) => {
              const updated = [data.name, ...prev.filter((s) => s !== data.name)];
              return updated.slice(0, 5);
            });

            // Fetch forecast data for current location
            try {
              const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
              const forecastResponse = await fetch(forecastUrl);
              if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                const processedForecast = processForecastData(forecastData);
                setForecast(processedForecast);
              }
            } catch (err) {
              console.log('Forecast data not available');
              setForecast(null);
            }
          } catch (err) {
            setError(err.message);
            setCityRegion(null);
            setForecast(null);
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

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
    } flex items-center justify-center p-4 sm:p-6 transition-colors duration-300`}>
      
      {/* Theme Toggle Button */}
      <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />

      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 mt-6 md:mt-10 px-16 sm:px-20">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${
            isDarkMode ? 'text-blue-400' : 'text-blue-900'
          } mb-2 drop-shadow-lg transition-colors duration-300`}>
            Weather Dashboard
          </h1>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches}
            onSearchClick={fetchWeatherByCity}
            loading={loading}
            isDark={isDarkMode}
          />
        )}

        {/* Search Bar */}
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={() => fetchWeather()}
          onLocationClick={fetchCurrentLocation}
          loading={loading}
          isDark={isDarkMode}
        />

        {/* Loading State */}
        {loading && <LoadingState isDark={isDarkMode} />}

        {/* Error Message */}
        {error && <ErrorMessage message={error} isDark={isDarkMode} />}

        {/* Weather Card and Forecast */}
        <div className="mb-0">
          {weather && !loading && (
            <>
              <WeatherCard 
                weather={weather}
                tempUnit={tempUnit}
                convertTemp={convertTemp}
                lastUpdated={lastUpdated}
                onRefresh={handleRefresh}
                onTempUnitChange={setTempUnit}
                loading={loading}
                cityRegion={cityRegion}
                isDark={isDarkMode}
              />

              {/* Forecast */}
              {forecast && (
                <ForecastCard 
                  forecast={forecast}
                  tempUnit={tempUnit}
                  convertTemp={convertTemp}
                  isDark={isDarkMode}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;