# Weather Dashboard
A responsive weather application built with React and Tailwind CSS that provides real-time weather information for cities worldwide. This project is part of the **ALX Frontend Web Development course**.

## Project Overview
This Weather Dashboard allows users to search for any city or use their current location to view real-time weather conditions. The application displays comprehensive weather information including temperature, "feels like" temperature, humidity, wind speed, pressure, and weather descriptions. The dashboard features a modern, fully responsive design that adapts seamlessly across all device sizes with a component-based architecture for maintainability and reusability.

## Live Demo
Coming soon - will be deployed to either Netlify/Vercel

## Features
1. **Real-time Weather Data** - Fetches current weather from OpenWeatherMap API
2. **City Search** - Search for any city worldwide with instant results
3. **Current Location** - Automatically fetch weather for your current location using geolocation
4. **Recent Searches** - Quick access to previously searched cities with styled pill buttons
5. **Comprehensive Weather Details**:
    - Current temperature (°C)
    - "Feels like" temperature
    - Weather condition description
    - Humidity percentage (%)
    - Wind speed (m/s)
    - Atmospheric pressure (hPa)
    - Visibility distance (km)
6. **Loading States** - Visual feedback with animated spinner while fetching data
7. **Error Handling** - User-friendly error messages for invalid cities, network issues, or location access problems
8. **Fully Responsive Design**:
    - Mobile: Portrait layout with stacked elements
    - Tablet & Desktop: Landscape layout with expanded 3-column grid for optimal screen utilization
    - Adaptive typography and spacing across all breakpoints
9. **Modern UI/UX** - Clean, intuitive interface with gradient buttons, smooth transitions, and blue-bordered recent search pills
10. **Component-Based Architecture** - Reusable components (SearchBar, WeatherCard, RecentSearches, ErrorMessage, LoadingState) for clean, maintainable code

## Component Structure
- **App.jsx** - Main application component managing state and API calls
- **SearchBar.jsx** - Search input with city search and geolocation buttons
- **WeatherCard.jsx** - Displays main weather information with 3-column layout
- **WeatherDetails.jsx** - Displays detailed weather metrics (humidity, wind, pressure, etc.)
- **RecentSearches.jsx** - Shows previously searched cities as clickable buttons
- **LoadingState.jsx** - Loading spinner animation
- **ErrorMessage.jsx** - Error notification display

## Technologies Used
| Technology | Purpose |
|------------|---------|
| **React.js** | Frontend framework for building UI components |
| **Vite** | Fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework for responsive styling |
| **Lucide React** | Icon library for UI elements |
| **OpenWeatherMap API** | Real-time weather data provider |
| **JavaScript (ES6+)** | Programming language |
| **Geolocation API** | Browser API for current location detection |

## Getting Started
### Prerequisites
The following were installed before the App development began:
- [Node.js](https://nodejs.org/)
- npm or yarn package manager
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`
5. Open your browser and navigate to the local server URL

## Key Features Explained
### Recent Searches
Users can quickly access their last 5 searched cities through blue-bordered pill buttons. Clicking any button instantly fetches that city's weather without re-typing.

### Responsive Layout
The dashboard automatically adjusts its layout based on screen size:
- On mobile, content stacks vertically
- On desktop, the weather card uses a 3-column layout (location/icon, temperature, details)

### Error Handling
The app gracefully handles various error scenarios:
- Invalid city names
- Network connectivity issues
- Geolocation permission denials
- API failures

## Future Enhancements
- Temperature unit toggle (°C/°F conversion)
- 5-day weather forecast display
- Search history with localStorage persistence
- Dynamic background based on weather conditions
- Weather alerts and warnings

## Git Workflow
This project follows a feature-branch workflow:
- Features are developed on feature branches (e.g., `feature/component-refactoring`)
- Pull Requests are used for code review
- Branches are merged to `main` after approval
- Local branches are cleaned up after merging

## Project Status
Completed: Component-based architecture, city search, geolocation, recent searches feature, responsive design
In Progress: Additional features and enhancements
Status: Core functionality working, Component structure implemented, Ready for feature expansion

## Repository
[GitHub Repository](https://github.com/Abul-Firdaws/alx-fe-capstone-project)