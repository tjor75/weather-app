import { useEffect, useState } from "react";
import * as owmService from "./services/owm-service.js";
import CurrentWeather from "./components/CurrentWeather/index.jsx";
import HourlyForecast from "./components/HourlyForecast/index.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "./components/UI/Footer/index.jsx";
import "./WeatherApp.css";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Buenos Aires, AR");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const newCurrentWeather = await owmService.getWeatherBySearchQueryAsync(selectedCity);
        const newHourlyForecast = await owmService.getHourlyForecastByCoordAsync(newCurrentWeather.coord);
        const newDailyForecast  = await owmService.getDailyForecastByCoordAsync(newCurrentWeather.coord);

        setCurrentWeather(newCurrentWeather);
        setHourlyForecast(newHourlyForecast);
        setDailyForecast(newDailyForecast);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const handleRetry = () => {
    setError(null);
    // This will trigger the useEffect to refetch data
  };

  if (error) {
    return (
      <div className="weather-app">
        <p className="card fatal-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <div>
        <CurrentWeather weatherData={currentWeather} />
        <HourlyForecast forecastData={hourlyForecast} />
      </div>
      <Footer />
    </div>
  );
}

export default WeatherApp;