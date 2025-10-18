import { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ city, onCityChange, onSearch, onLocationClick, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full bg-blue-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-base md:text-lg"
          />
        </div>

        <button
          onClick={onSearch}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Search
        </button>

        <button
          onClick={onLocationClick}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-900 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-900 transition active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Current Location
        </button>
      </div>
    </div>
  );
}

export default SearchBar;