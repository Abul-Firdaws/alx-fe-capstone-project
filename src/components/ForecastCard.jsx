function ForecastCard({ forecast, tempUnit, convertTemp }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="mt-8 pt-6 border-t border-blue-200 bg-blue-200-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="w-full bg-blue-200 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            {/* Date */}
            <p className="text-sm font-semibold text-gray-700 mb-3">
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
            <p className="text-xs text-gray-600 text-center mb-3 capitalize">
              {day.description}
            </p>

            {/* Temperature */}
            <div className="mb-3 text-center">
              <p className="text-lg font-bold text-blue-600">
                {convertTemp(day.temp_max)}° / {convertTemp(day.temp_min)}°
              </p>
              <p className="text-xs text-gray-500">{tempUnit}</p>
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity:</span>
                <span className="font-semibold text-gray-800">{day.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wind:</span>
                <span className="font-semibold text-gray-800">{Math.round(day.wind_speed)} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pressure:</span>
                <span className="font-semibold text-gray-800">{day.pressure} hPa</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;