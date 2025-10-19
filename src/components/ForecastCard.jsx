function ForecastCard({ forecast, tempUnit, convertTemp, isDark }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`mt-8 pt-6 border-t ${
      isDark ? 'border-gray-700' : 'border-blue-200'
    } p-6 transition-colors duration-300`}>
      <h3 className={`text-2xl font-bold ${
        isDark ? 'text-gray-100' : 'text-gray-800'
      } mb-6`}>
        5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className={`w-full ${
            isDark ? 'bg-gray-800' : 'bg-blue-200'
          } rounded-2xl shadow-xl p-6 md:p-8 mb-8 transition-colors duration-300`}>
            {/* Date */}
            <p className={`text-sm font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } mb-3`}>
              {formatDate(day.date)}
            </p>
            
            {/* Weather Icon */}
            <div className="mb-3 text-center">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-12 h-12 mx-auto"
              />
            </div>
            
            {/* Weather Description */}
            <p className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } text-center mb-3 capitalize`}>
              {day.description}
            </p>
            
            {/* Temperature */}
            <div className="mb-3 text-center">
              <p className={`text-lg font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {convertTemp(day.temp_max)}° / {convertTemp(day.temp_min)}°
              </p>
              <p className={`text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {tempUnit}
              </p>
            </div>
            
            {/* Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Humidity:
                </span>
                <span className={`font-semibold ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {day.humidity}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Wind:
                </span>
                <span className={`font-semibold ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {Math.round(day.wind_speed)} m/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Pressure:
                </span>
                <span className={`font-semibold ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {day.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;