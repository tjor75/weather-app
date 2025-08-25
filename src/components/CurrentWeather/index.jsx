import React from "react";
import Skeleton from "react-loading-skeleton";

function CurrentWeather({ weatherData }) {
  return (
    <div className="current-weather">
      {weatherData ? (
        <p>{weatherData.name}</p>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default CurrentWeather;