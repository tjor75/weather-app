import React from "react";
import Skeleton from "react-loading-skeleton";
import { convertKelvinToCelsius, formatTime } from "../../helpers/format-helper";
import WeatherIcon from "../UI/WeatherIcon";

function CurrentWeather({ weatherData }) {
  return (
    <div className="current-weather">
      {weatherData ? (
        <>
          <div>
            <p>{convertKelvinToCelsius(weatherData.main.temp)}°</p>
            <div>
              <p>{weatherData.name}</p>
              <p>{formatTime(weatherData.dt)}</p>
            </div>
          </div>
          <div>
            <WeatherIcon weatherId={weatherData.weather.id} />
          </div>
        </>
      ) : (
        <p><Skeleton /></p>
      )}
    </div>
  );
}

export default CurrentWeather;