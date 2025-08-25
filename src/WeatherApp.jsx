import { useEffect, useState } from "react";
import * as owmService from "./services/owm-service.js";
import CurrentWeather from "./components/CurrentWeather/index.jsx";
import HourlyForecast from "./components/HourlyForecast/index.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "./components/UI/Footer/index.jsx";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Buenos Aires, AR");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const newCurrentWeather = await owmService.getWeatherByQueryAsync(selectedCity);
      setCurrentWeather(newCurrentWeather);
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