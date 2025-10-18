function WeatherCard({ weather, tempUnit, convertTemp }) {
  return (
    <div className="bg-blue-100 rounded-2xl shadow-2xl p-6 md:p-10">
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
              {convertTemp(weather.main.temp)}°
            </p>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 capitalize font-medium mb-6">
            {weather.weather[0].description}
          </p>
          
          {/* Feels Like */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Feels Like {convertTemp(weather.main.feels_like)}°
            </p>
          </div>
        </div>

        {/* Right Column - Details Grid */}
        <div className="md:col-span-1 md:border-l md:border-gray-200 md:pl-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Details</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Humidity</p>
              <p className="text-2xl font-semibold text-blue-600">
                {weather.main.humidity}%
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Wind Speed</p>
              <p className="text-2xl font-semibold text-blue-600">
                {weather.wind.speed} m/s
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Pressure</p>
              <p className="text-2xl font-semibold text-blue-600">
                {weather.main.pressure} hPa
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">Visibility</p>
              <p className="text-2xl font-semibold text-blue-600">
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