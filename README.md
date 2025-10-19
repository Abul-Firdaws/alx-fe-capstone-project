# Weather Dashboard

A responsive, theme-adaptive weather application built with **React** and **Tailwind CSS**, providing real-time weather information for cities worldwide.  
This project forms part of the **ALX Frontend Web Development** course and demonstrates advanced component architecture, responsive UI design, and API integration best practices.

---

## Project Overview

The **Weather Dashboard** allows users to:

- Search for any city globally, including custom Savannah Region towns in Ghana  
- Fetch current weather and 5-day forecasts using the **OpenWeatherMap API**  
- View detailed weather metrics like temperature, humidity, wind, and pressure  
- Toggle between **Celsius/Fahrenheit**, **Dark/Light** themes, and refresh data instantly  

Built with a **component-based React architecture**, it emphasizes clean UI, accessibility, and maintainability.

---

## Live Demo

**[View Live Site →](https://personal-weather-hub.vercel.app/)**

---

## Key Features

### Core Functionality
- **Global City Search** — Fetch weather for any city worldwide  
- **Custom City Integration** — Supports 8 Savannah Region towns (Damongo, Daboya, Kpembi, Yapei, Buipe, Sawla, Busunu, Kpalbe) with coordinate-based accuracy  
- **Current Location Button** — Instantly fetch weather using the browser's Geolocation API  
- **Real-time Data Fetching** — Retrieves current weather and 5-day forecast simultaneously  
- **Comprehensive Weather Details:**  
  - Temperature (°C/°F)  
  - "Feels like" temperature  
  - Humidity, Wind Speed, Pressure  
  - Weather description and visibility  

### Interface & Usability
- **Recent Searches** — Displays last five searched cities as clickable, blue-bordered pill buttons  
- **Dark/Light Theme Toggle** — Switch seamlessly between light (blue-based) and dark (gray-based) themes  
- **Refresh Button** — Re-fetches latest weather data with updated timestamp  
- **Last Updated Time** — Displays time of last successful fetch in `HH:MM` format  
- **Responsive Layout:**  
  - Mobile: Stacked layout for easy reading  
  - Tablet/Desktop: 3-column layout for detailed view  
- **Modern, Minimal UI/UX** — Smooth transitions, gradient buttons, and balanced spacing  

### Error Handling & Loading States
- Animated spinner while fetching data  
- Friendly error messages for invalid cities, network issues, or denied location access  

---

## Component Architecture

| Component | Description |
|------------|--------------|
| **App.jsx** | Main state manager and API handler (weather, forecast, theme) |
| **SearchBar.jsx** | Input field with search and geolocation buttons |
| **WeatherCard.jsx** | Displays current weather, timestamp, refresh, and temperature toggle |
| **WeatherDetails.jsx** | Shows detailed weather stats (humidity, wind, pressure) |
| **ForecastCard.jsx** | Displays 5-day forecast in responsive grid |
| **RecentSearches.jsx** | Renders recent cities as interactive buttons |
| **LoadingState.jsx** | Animated spinner for fetch loading |
| **ErrorMessage.jsx** | Displays user-friendly error feedback |
| **ThemeToggle.jsx** | Dark/Light theme toggle component |

---

## Technologies Used

| Technology | Purpose |
|-------------|----------|
| **React.js (Vite)** | Component-based UI and fast development environment |
| **Tailwind CSS** | Utility-first responsive styling |
| **Lucide React** | Modern icon set for consistent UI visuals |
| **OpenWeatherMap API** | Real-time weather and forecast data |
| **Geolocation API** | Detects user's current location |
| **JavaScript (ES6+)** | Core programming logic and interactivity |

---

## Getting Started

### Prerequisites
Ensure the following are installed:
- Node.js  
- npm or yarn  
- Free API key from [OpenWeatherMap](https://openweathermap.org/)

### Installation

Clone this repository:

```bash
git clone https://github.com/Abul-Firdaws/alx-fe-capstone-project.git
cd alx-fe-capstone-project
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Then open your browser and visit the local URL provided.

---

## Feature Deep Dive

### Custom City Support

For smaller Savannah Region towns not found in OpenWeatherMap's database, the app uses coordinate-based data fetching for:
Damongo, Daboya, Kpembi, Yapei, Buipe, Sawla, Busunu, and Kpalbe.

Each town displays its exact name and region for accuracy.

### Temperature Unit Toggle

Switch between Celsius (°C) and Fahrenheit (°F) dynamically

All displayed temperatures update instantly when toggled

### Refresh & Timestamp

The refresh button re-fetches data and updates the timestamp

Ensures users always see the latest information

### Theme Toggle

Users can toggle between Light and Dark modes

Smooth 300ms transitions between themes

Tailwind utility classes for styling consistency

Fixed button placement (top-right corner)

Fully responsive across all devices

### 5-Day Forecast

Summarizes 3-hourly API data into daily stats:

- Date
- Weather icon
- High/low temperature
- Humidity, wind, and pressure

---

## Testing Summary

Verified temperature conversion, refresh updates, and theme switching

Confirmed custom towns and international cities both fetch correctly

Tested recent searches, localStorage persistence, and mobile responsiveness

Verified all transitions and states render correctly in both themes

Confirmed forecast data accuracy

---

## Git Workflow

Each feature developed in its own branch (e.g., feature/dark-light-theme)

Code reviewed via Pull Requests

Merges approved into the main branch

Branches cleaned up post-merge

---

## Project Status

| Area | Status |
|------|--------|
| Core Weather Features | Completed |
| Forecast System | Completed |
| Dark/Light Theme | Completed |
| Responsive Layout | Completed |
| LocalStorage Persistence | Works for recent searches |
| Enhancements | In progress |

---

## Future Enhancements

- Persistent theme preference using localStorage
- Weather-based dynamic backgrounds
- Alert and notification system (weather warnings)
- Offline caching for recent searches
- Map visualization for searched cities

---

## Repository

**GitHub:** [Abul-Firdaws / alx-fe-capstone-project](https://github.com/Abul-Firdaws/alx-fe-capstone-project)

**Live Site:** [personal-weather-hub.vercel.app](https://personal-weather-hub.vercel.app)