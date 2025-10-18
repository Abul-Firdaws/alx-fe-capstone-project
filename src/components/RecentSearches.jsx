function RecentSearches({ searches, onSearchClick, loading }) {
  return (
    <div className="mb-6">
        <h3 className="text-gray-800 font-semibold mb-4 text-lg">Recent Searches</h3>
        <div className="flex flex-wrap gap-3">
          {searches.map((city, index) => (
            <button
              key={index}
              onClick={() => onSearchClick(city)}
              disabled={loading}
              className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-400 font-medium rounded-full hover:border-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
  );
}

export default RecentSearches;