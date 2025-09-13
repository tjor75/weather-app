import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import nProgress from "nprogress";
import { NUM_HOURLY_FORECASTS } from "./constants/forecast.js";
import { DEFAULT_SELECTED_CITY, DEFAULT_TEMPERATURE_UNIT } from "./constants/default.js";
import { groupWeatherByDay } from "./helpers/format-helper.js";
import { convertTempFromKelvin } from "./helpers/temperature-helper.js";
import * as owmService from "./services/owm-service.js";
import { GlobalContext } from "./contexts/GlobalContext.jsx";
import { SearchContext } from "./contexts/SearchContext.jsx";
import FatalError from "./components/UI/FatalError";
import Options from "./components/Options";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import OtherCities from "./components/OtherCities";
import DailyForecast from "./components/DailyForecast";
import Footer from "./components/UI/Footer";
import "nprogress/nprogress.css";
import "./WeatherApp.css";

function WeatherApp() {
  const [temperatureUnit, setTemperatureUnit] = useState(null);
  // Theme: 'dark' | 'light'
  const [theme, setTheme] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(0);

  const { selectedCityLocation } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (pending === 1)      nProgress.start();
    else if (pending === 0) nProgress.done();
    
    if (pending > 0)        nProgress.inc();
  }, [pending]);

  useEffect(() => {
    if (selectedCityLocation !== selectedCity)
      setSelectedCity((selectedCityLocation || localStorage.getItem("selectedCity")) ?? DEFAULT_SELECTED_CITY);
  }, [selectedCityLocation]);

  useEffect(() => {
    document.title = currentWeather ? `${convertTempFromKelvin(currentWeather.main.temp, temperatureUnit)}°${temperatureUnit} - ${currentWeather.name}, ${currentWeather.sys.country}` : 'Weather App';
  }, [currentWeather, temperatureUnit]);

  useEffect(() => {
    if (!temperatureUnit) {
      setTemperatureUnit(localStorage.getItem("temperatureUnit") ?? DEFAULT_TEMPERATURE_UNIT);
    }
    localStorage.setItem("temperatureUnit", temperatureUnit ?? DEFAULT_TEMPERATURE_UNIT);
  }, [temperatureUnit]);

  // Initialize theme from localStorage or prefers-color-scheme, then persist and apply to document root
  useEffect(() => {
    if (!theme) {
      const stored = localStorage.getItem("theme");
      if (stored === "DARK" || stored === "LIGHT") {
        setTheme(stored);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? "DARK" : "LIGHT");
      }
      return;
    }
    localStorage.setItem("theme", theme);
    // Apply as data attribute for easy theming overrides
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      increasePending();
      setError("");
      
      try {
        localStorage.setItem("selectedCity", selectedCityLocation);

        const newCurrentWeather = await owmService.getWeatherBySearchQueryAsync(selectedCity);
        setCurrentWeather(newCurrentWeather);

        const newDailyForecast = await owmService.getDailyForecastByCoordAsync(newCurrentWeather.coord);
        setHourlyForecast(() => {
          const nextForecastPos = newDailyForecast.list.findIndex(forecast => (forecast.dt * 1000 > Date.now()));
          return newDailyForecast.list.slice(nextForecastPos, nextForecastPos + NUM_HOURLY_FORECASTS)
        });
        setDailyForecast(groupWeatherByDay(newDailyForecast.list));

        setSearchQuery("");
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      } finally {
        decreasePending();
      }
    };

    if (selectedCity) {
      if (selectedCity !== selectedCityLocation) {
        navigate(`/${encodeURIComponent(selectedCity)}`, { replace: true });
      }
      fetchData();
    }
  }, [selectedCity]);

  const increasePending = () => setPending(p => p + 1);
  const decreasePending = () => setPending(p => p - 1);

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
    <GlobalContext.Provider value={{ temperatureUnit, setTemperatureUnit, theme, setTheme, setSelectedCity, increasePending, decreasePending }}>
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
              <OtherCities />
              <DailyForecast forecastData={dailyForecast} />
            </>
        }
      </div>
      <Footer />
    </GlobalContext.Provider>
  );
}

export default WeatherApp;