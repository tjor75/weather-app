import Skeleton from "react-loading-skeleton";
import { convertKelvinToCelsius, formatTime } from "../../helpers/format-helper.js";
import WeatherIcon from "../UI/WeatherIcon";
import atmosphere from "../../assets/icons/atmosphere.png";
import "./CurrentWeather.css";

function CurrentWeather({ weatherData }) {
  return (
    <div className="current-weather">
      {weatherData ? (
        <>
          <div>
            <p className="temperature">{convertKelvinToCelsius(weatherData.main.temp)}°</p>
            <div className="location-time">
              <p>{weatherData.name}</p>
              <p>{formatTime(weatherData.dt)}</p>
            </div>
          </div>
          <div>
            <div className="weather-info">
              <WeatherIcon weatherId={weatherData.weather[0].id} />
              <p>{weatherData.weather[0].main}</p>
            </div>
            <div className="wind-info">
              <img src={atmosphere} alt="Wind Icon" />
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
          <div>
            <p>Feels like: {convertKelvinToCelsius(weatherData.main.feels_like)}°</p>
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