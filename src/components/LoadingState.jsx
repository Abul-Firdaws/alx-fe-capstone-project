function LoadingState({ isDark }) {
  return (
    <div className={`${
      isDark ? 'bg-gray-800/95' : 'bg-white/95'
    } backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center transition-colors duration-300`}>
      <div className={`animate-spin rounded-full h-16 w-16 border-4 ${
        isDark ? 'border-gray-700 border-t-blue-400' : 'border-blue-200 border-t-blue-500'
      } mx-auto`}></div>
      <p className={`mt-6 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      } text-lg font-medium transition-colors`}>
        Loading weather data...
      </p>
    </div>
  );
}

export default LoadingState;