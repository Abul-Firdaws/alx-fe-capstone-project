function LoadingState() {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto"></div>
      <p className="mt-6 text-gray-600 text-lg font-medium">Loading weather data...</p>
    </div>
  );
}

export default LoadingState;