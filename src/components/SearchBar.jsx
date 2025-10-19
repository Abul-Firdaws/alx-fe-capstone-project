import { Search, MapPin } from 'lucide-react';

function SearchBar({ city, onCityChange, onSearch, onLocationClick, loading, isDark }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`w-full ${
      isDark ? 'bg-gray-800' : 'bg-blue-200'
    } rounded-2xl shadow-xl p-6 md:p-8 mb-8 transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          } w-5 h-5`} />
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            className={`w-full pl-10 pr-4 py-3 border-2 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-base md:text-lg`}
          />
        </div>
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-500 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Search
        </button>
        <button
          onClick={onLocationClick}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-900 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-900 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 justify-center"
        >
          <MapPin size={18} />
          Current Location
        </button>
      </div>
    </div>
  );
}

export default SearchBar;