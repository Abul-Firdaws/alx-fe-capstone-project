function WeatherDetails({ weather }) {
  const details = [
    { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°C` },
    { label: 'Humidity', value: `${weather.main.humidity}%` },
    { label: 'Wind', value: `${Math.round(weather.wind.speed)} m/s` },
    { label: 'Pressure', value: `${weather.main.pressure} hPa` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {details.map((detail) => (
        <div key={detail.label} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
          <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">{detail.label}</p>
          <p className="text-lg md:text-2xl font-bold text-blue-600">{detail.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherDetails;