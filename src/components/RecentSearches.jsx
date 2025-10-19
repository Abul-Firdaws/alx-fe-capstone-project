function RecentSearches({ searches, onSearchClick, loading, isDark }) {
  return (
    <div className="mb-6">
      <h3 className={`${
        isDark ? 'text-gray-200' : 'text-gray-800'
      } font-semibold mb-4 text-lg transition-colors`}>
        Recent Searches
      </h3>
      <div className="flex flex-wrap gap-3">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(city)}
            disabled={loading}
            className={`px-4 py-2 ${
              isDark 
                ? 'bg-gray-800 text-blue-400 border-blue-500 hover:border-blue-400' 
                : 'bg-white text-blue-600 border-blue-400 hover:border-blue-600'
            } border-2 font-medium rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;