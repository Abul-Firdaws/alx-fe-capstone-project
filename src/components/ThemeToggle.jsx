import { Sun, Moon } from 'lucide-react';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 sm:top-6 sm:right-8 md:right-12 lg:right-16 p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 z-50 border-2 border-gray-200 dark:border-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      )}
    </button>
  );
}

export default ThemeToggle;