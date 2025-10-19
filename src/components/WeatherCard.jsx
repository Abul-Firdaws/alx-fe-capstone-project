import { RotateCw } from 'lucide-react';

function WeatherCard({ weather, tempUnit, convertTemp, lastUpdated, onRefresh, onTempUnitChange, loading, cityRegion, isDark }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`${
      isDark ? 'bg-gray-800' : 'bg-blue-200'
    } rounded-2xl shadow-2xl p-6 md:p-10 transition-colors duration-300`}>
      {/* Top Controls - Timestamp, Refresh, Temp Toggle */}
      <div className={`mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b ${
        isDark ? 'border-gray-700' : 'border-white-200'
      }`}>
        {/* Timestamp and Refresh */}
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {lastUpdated ? formatTime(lastUpdated) : 'Loading...'}
          </span>
          
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`${
              isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
            } transition disabled:text-gray-500 disabled:cursor-not-allowed`}
            title="Refresh weather"
          >
            <RotateCw size={20} />
          </button>
        </div>

        {/* Temperature Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTempUnitChange('C')}
            className={`text-lg font-semibold transition ${
              tempUnit === 'C'
                ? 'text-blue-500'
                : isDark ? 'text-gray-400' : 'text-slate-900'
            }`}
          >
            °C
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => onTempUnitChange('F')}
            className={`text-lg font-semibold transition ${
              tempUnit === 'F'
                ? 'text-blue-500'
                : isDark ? 'text-gray-400' : 'text-slate-900'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Weather Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        
        {/* Left Column - Location & Weather Icon */}
        <div className={`md:col-span-1 text-center md:text-left md:border-r ${
          isDark ? 'md:border-gray-700' : 'md:border-gray-200'
        } md:pr-8`}>
          <h2 className={`text-3xl md:text-4xl font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          } mb-1`}>
            {weather.name}
          </h2>
          <p className={`${
            isDark ? 'text-gray-400' : 'text-gray-500'
          } text-lg md:text-xl mb-6`}>
            {cityRegion ? `${cityRegion}, ${weather.sys.country}` : weather.sys.country}
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg mx-auto md:mx-0"
            />
          </div>
        </div>

        {/* Center Column - Temperature & Description */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <p className={`text-6xl md:text-7xl font-bold ${
              isDark 
                ? 'bg-gradient-to-br from-blue-400 to-indigo-400' 
                : 'bg-gradient-to-br from-blue-600 to-indigo-600'
            } bg-clip-text text-transparent`}>
              {convertTemp(weather.main.temp)}°
            </p>
          </div>
          <p className={`text-xl md:text-2xl ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } capitalize font-medium mb-6 text-center`}>
            {weather.weather[0].description}
          </p>
          
          {/* Feels Like */}
          <div className="text-center">
            <p className={`${
              isDark ? 'text-gray-400' : 'text-gray-500'
            } text-sm`}>
              Feels Like {convertTemp(weather.main.feels_like)}°
            </p>
          </div>
        </div>

        {/* Right Column - Details Grid */}
        <div className={`md:col-span-1 md:border-l ${
          isDark ? 'md:border-gray-700' : 'md:border-gray-200'
        } md:pl-8`}>
          <h3 className={`text-2xl font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          } mb-6`}>
            Details
          </h3>
          
          <div className="space-y-4">
            <div className={`${
              isDark ? 'bg-gray-700' : 'bg-blue-50'
            } rounded-lg p-4 transition-colors duration-300`}>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } text-sm mb-1`}>
                Humidity
              </p>
              <p className={`text-2xl font-semibold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {weather.main.humidity}%
              </p>
            </div>

            <div className={`${
              isDark ? 'bg-gray-700' : 'bg-blue-50'
            } rounded-lg p-4 transition-colors duration-300`}>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } text-sm mb-1`}>
                Wind Speed
              </p>
              <p className={`text-2xl font-semibold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {weather.wind.speed} m/s
              </p>
            </div>

            <div className={`${
              isDark ? 'bg-gray-700' : 'bg-blue-50'
            } rounded-lg p-4 transition-colors duration-300`}>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } text-sm mb-1`}>
                Pressure
              </p>
              <p className={`text-2xl font-semibold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {weather.main.pressure} hPa
              </p>
            </div>

            <div className={`${
              isDark ? 'bg-gray-700' : 'bg-blue-50'
            } rounded-lg p-4 transition-colors duration-300`}>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-500'
              } text-sm mb-1`}>
                Visibility
              </p>
              <p className={`text-2xl font-semibold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;