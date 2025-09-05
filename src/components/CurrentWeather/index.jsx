import Skeleton from "react-loading-skeleton";
import { convertKelvinToCelsius, formatTime } from "../../helpers/format-helper.js";
import WeatherIcon from "../UI/WeatherIcon";
import atmosphere from "../../assets/icons/atmosphere.png";
import "./CurrentWeather.css";

function CurrentWeather({ weatherData }) {
  return (
    <div className="current-weather card">
      {weatherData ? (
        <>
          <div className="basic-current-info">
            <p className="temperature">{convertKelvinToCelsius(weatherData.main.temp)}°</p>
            <div className="location-time">
              <p>{weatherData.name}</p>
              <p>{formatTime(weatherData.dt)}</p>
            </div>
          </div>
          <div className="sky-info">
            <div className="weather-info">
              <WeatherIcon weatherId={weatherData.weather[0].id} />
              <p>{weatherData.weather[0].main}</p>
            </div>
            <div className="wind-info">
              <img src={atmosphere} alt="Wind Icon" />
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
          <div className="other-temperatures-info">
            <p>Feels like: {convertKelvinToCelsius(weatherData.main.feels_like)}°C</p>
            <p>{convertKelvinToCelsius(weatherData.main.temp_min)}° to {convertKelvinToCelsius(weatherData.main.temp_max)}°</p>
          </div>
        </>
      ) : (
        <p><Skeleton /></p>
      )}
    </div>
  );
}

export default CurrentWeather;