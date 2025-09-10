import { useEffect, useState } from "react";
import nProgress from "nprogress";
import { NUM_HOURLY_FORECASTS } from "./constants/forecast.js";
import { groupWeatherByDay } from "./helpers/format-helper.js";
import { TemperatureUnit } from "./constants/temperature-unit.js";
import * as owmService from "./services/owm-service.js";
import { GlobalContext } from "./contexts/GlobalContext.jsx";
import { SearchContext } from "./contexts/SearchContext.jsx";
import FatalError from "./components/UI/FatalError";
import Options from "./components/Options";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Footer from "./components/UI/Footer";
import "nprogress/nprogress.css";
import "./WeatherApp.css";

function WeatherApp() {
  const [temperatureUnit, setTemperatureUnit] = useState(TemperatureUnit.CELSIUS);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Buenos Aires, AR");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading)  nProgress.start();
    else          nProgress.done();
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      
      try {
        const newCurrentWeather = await owmService.getWeatherBySearchQueryAsync(selectedCity);
        const newDailyForecast = await owmService.getDailyForecastByCoordAsync(newCurrentWeather.coord);
        const nextForecastPos = await newDailyForecast.list.findIndex(forecast => (forecast.dt * 1000 > Date.now()));

        setCurrentWeather(newCurrentWeather);
        setHourlyForecast(newDailyForecast.list.slice(nextForecastPos, nextForecastPos + NUM_HOURLY_FORECASTS));
        setDailyForecast(groupWeatherByDay(newDailyForecast.list));

        setSearchQuery("");
      } catch (err) {
        console.error(err);
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

  const handleRetry = () => {
    setError("");
    // This will trigger the useEffect to refetch data
  };

  if (error && !error.startsWith("404")) {
    return (
      <div className="weather-app">
        <FatalError error={error} />
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <GlobalContext.Provider value={{ temperatureUnit, setTemperatureUnit, setSelectedCity }}>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Options />
      </SearchContext.Provider>
      <div className="weather-app">
        {
          error.startsWith("404") ?
            <FatalError error={error} />
          :
            <>
              <CurrentWeather weatherData={currentWeather} />
              <HourlyForecast forecastData={hourlyForecast} />
              <div></div>
              <DailyForecast forecastData={dailyForecast} />
            </>
        }
      </div>
      <Footer />
    </GlobalContext.Provider>
  );
}

export default WeatherApp;