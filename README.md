# Weather Dashboard
A responsive weather application built with React and Tailwind CSS that provides real-time weather information for cities worldwide. This project is part of the **ALX Frontend Web Development course**.

## Project Overview
This Weather Dashboard allows users to search for any city or use their current location to view real-time weather conditions. The application displays comprehensive weather information including temperature, "feels like" temperature, humidity, wind speed, pressure, and weather descriptions. The dashboard features a modern, fully responsive design that adapts seamlessly across all device sizes.

## Live Demo
Coming soon - will be deployed to either Netlify/Vercel

## Features
1. **Real-time Weather Data** - Fetches current weather from OpenWeatherMap API
2. **City Search** - Search for any city worldwide with instant results
3. **Current Location** - Automatically fetch weather for your current location using geolocation
4. **Comprehensive Weather Details**:
    - Current temperature (°C)
    - "Feels like" temperature
    - Weather condition description
    - Humidity percentage (%)
    - Wind speed (m/s)
    - Atmospheric pressure (hPa)
5. **Loading States** - Visual feedback with animated spinner while fetching data
6. **Error Handling** - User-friendly error messages for invalid cities, network issues, or location access problems
7. **Fully Responsive Design**:
    - Mobile: Portrait layout with stacked elements
    - Tablet & Desktop: Landscape layout with expanded 3-column grid for optimal screen utilization
    - Adaptive typography and spacing across all breakpoints
8. **Modern UI/UX** - Clean, intuitive interface with gradient buttons, smooth transitions, and glassmorphism effects

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