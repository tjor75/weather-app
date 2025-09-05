import { useEffect, useState } from "react";
import * as owmService from "./services/owm-service.js";
import CurrentWeather from "./components/CurrentWeather/index.jsx";
import HourlyForecast from "./components/HourlyForecast/index.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "./components/UI/Footer/index.jsx";
import "./WeatherApp.css";
import { searchLastTodayByUnix } from "./helpers/search-helper.js";

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
        const newDailyForecast = await owmService.getDailyForecastByCoordAsync(newCurrentWeather.coord);
        const lastTodayForecastPos = await searchLastTodayByUnix(newDailyForecast.list);

        setCurrentWeather(newCurrentWeather);
        setHourlyForecast(newDailyForecast.list.slice(0, lastTodayForecastPos));
        setDailyForecast(newDailyForecast.list.slice(lastTodayForecastPos));
      } catch (err) {
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
    <>
      {/* <Header /> */ }
      <div className="weather-app">
        <div>
          <CurrentWeather weatherData={currentWeather} />
          <HourlyForecast forecastData={hourlyForecast} />
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
}

export default WeatherApp;