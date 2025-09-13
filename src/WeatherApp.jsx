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
  const [temperatureUnit, setTemperatureUnit] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { selectedCityLocation } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading)  nProgress.start();
    else          nProgress.done();
  }, [loading]);

  useEffect(() => {
    if (selectedCityLocation && selectedCityLocation !== selectedCity)
      setSelectedCity((selectedCityLocation || localStorage.getItem("selectedCity")) ?? DEFAULT_SELECTED_CITY);
  }, [selectedCityLocation]);

  useEffect(() => {
    document.title = currentWeather ? `${convertTempFromKelvin(currentWeather.main.temp, temperatureUnit)}°${temperatureUnit} - ${currentWeather.name}, ${currentWeather.sys.country}` : 'Weather App';
  }, [currentWeather, temperatureUnit]);

  useEffect(() => {
    if (!temperatureUnit) {
      setTemperatureUnit(localStorage.getItem("temperatureUnit") ?? DEFAULT_TEMPERATURE_UNIT);
    }
    localStorage.setItem("temperatureUnit", temperatureUnit);
  }, [temperatureUnit]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    if (selectedCity) {
      if (selectedCity !== selectedCityLocation) {
        navigate(`/${encodeURIComponent(selectedCity)}`, { replace: true });
      }
      fetchData();
    }
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