import { RotateCw, Clock } from 'lucide-react';

function TopControls({ 
  lastUpdated, 
  onRefresh, 
  loading, 
  weather,
  tempUnit, 
  onTempUnitChange 
}) {
  // Don't show if no weather is displayed
  if (!weather) {
    return null;
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Timestamp */}
      <div className="flex items-center text-gray-700 gap-2">
        <Clock size={18} />
        <span className="text-sm font-medium">
          {lastUpdated ? formatTime(lastUpdated) : 'Loading...'}
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="text-gray-700 hover:text-blue-600 transition disabled:text-gray-400 disabled:cursor-not-allowed"
          title="Refresh weather"
        >
          <RotateCw size={20} />
        </button>

        {/* Temperature Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTempUnitChange('C')}
            className={`text-lg font-semibold transition ${
              tempUnit === 'C'
                ? 'text-blue-600'
                : 'text-gray-400'
            }`}
          >
            °C
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => onTempUnitChange('F')}
            className={`text-lg font-semibold transition ${
              tempUnit === 'F'
                ? 'text-blue-600'
                : 'text-gray-400'
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopControls;