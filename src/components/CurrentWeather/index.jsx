import { useContext } from "react";
import { convertTempFromKelvin } from "../../helpers/temperature-helper.js";
import { formatTime } from "../../helpers/format-helper.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import Skeleton from "react-loading-skeleton";
import WeatherInfo from "../UI/WeatherInfo";
import atmosphere from "../../assets/icons/atmosphere.png";
import "./CurrentWeather.css";

function CurrentWeather({ weatherData }) {
  const { temperatureUnit } = useContext(GlobalContext);
  return (
    <div className="current-weather card">
      {weatherData ? (
        <>
          <div className="basic-current-info">
            <p className="temperature">{convertTempFromKelvin(weatherData.main.temp, temperatureUnit)}°</p>
            <div className="location-time">
              <p>{weatherData.name}</p>
              <p>{formatTime(weatherData.dt)}</p>
            </div>
          </div>
          <div className="sky-info">
            <WeatherInfo weatherId={weatherData.weather[0].id} weatherMain={weatherData.weather[0].main} />
            <div className="wind-info">
              <img src={atmosphere} alt={weatherData.weather[0].main + " Icon"} />
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
          <div className="other-temperatures-info">
            <p>Feels like: {convertTempFromKelvin(weatherData.main.feels_like, temperatureUnit)}°{temperatureUnit}</p>
            <p>{convertTempFromKelvin(weatherData.main.temp_min, temperatureUnit)}° to {convertTempFromKelvin(weatherData.main.temp_max, temperatureUnit)}°</p>
          </div>
        </>
      ) : (
        <p><Skeleton /></p>
      )}
    </div>
  );
}

export default CurrentWeather;