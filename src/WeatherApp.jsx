import { useEffect, useState } from "react";
import * as owmService from "./services/owm-service.js";
import CurrentWeather from "./components/CurrentWeather/index.jsx";
import HourlyForecast from "./components/HourlyForecast/index.jsx";
import "react-loading-skeleton/dist/skeleton.css";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const lon = selectedCity.coord.lon;
    const lat = selectedCity.coord.lat;

    setCurrentWeather(async () => await owmService.getWeatherByCoordAsync(lon, lat));
  }, [selectedCity]);

  const handleCitySearch = (city) => {
    // Update selected city
  };

  const handleTemperatureUnitChange = (unit) => {
    // Update temperature unit (Celsius or Fahrenheit)
  };

  const handleSearchQueryChange = (event) => {
    // Update search query
  };

  const handleSearch = () => {
    // Trigger city search
  };

  return (
    <div className="weather-app">
      <div>
        <CurrentWeather weatherData={currentWeather} />
        <HourlyForecast forecastData={hourlyForecast} />
      </div>
    </div>
  );
}

export default WeatherApp;