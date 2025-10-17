import { useState } from 'react';
import { Search } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch weather for a city
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

  // Fetch weather by current location
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
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

        {/* Search Card */}
        <div className="w-full bg-black/20 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base md:text-lg"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Search
            </button>

            {/* Current Location Button */}
            <button
              onClick={fetchCurrentLocation}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Current Location
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-2xl p-3">
            <div className="flex items-center gap-3 justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              
              {/* Left Column - Location & Weather Icon */}
              <div className="md:col-span-1 text-center md:text-left md:border-r md:border-gray-200 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                  {weather.name}
                </h2>
                <p className="text-gray-500 text-lg md:text-xl mb-6">
                  {weather.sys.country}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                  className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg mx-auto md:mx-0"
                />
              </div>

              {/* Center Column - Temperature & Description */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <div className="text-center mb-6">
                  <p className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {Math.round(weather.main.temp)}°
                  </p>
                  <p className="text-gray-500 text-xl md:text-2xl font-medium">Celsius</p>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 capitalize font-medium">
                  {weather.weather[0].description}
                </p>
              </div>

              {/* Right Column - Details Grid */}
              <div className="md:col-span-1 md:border-l md:border-gray-200 md:pl-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">Feels Like</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {Math.round(weather.main.feels_like)}°C
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">Humidity</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {weather.main.humidity}%
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">Wind</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {Math.round(weather.wind.speed)} m/s
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">Pressure</p>
                    <p className="text-lg md:text-2xl font-bold text-blue-600">
                      {weather.main.pressure} hPa
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;