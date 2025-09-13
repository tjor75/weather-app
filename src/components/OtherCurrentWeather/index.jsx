import { useContext, useEffect } from "react";
import { getCountry } from "countries-and-timezones";
import { convertTempFromKelvin } from "../../helpers/temperature-helper.js";
import { formatDescription } from "../../helpers/format-helper.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import WeatherIcon from "../UI/WeatherIcon";
import "./OtherCurrentWeather.css";

function OtherCurrentWeather({ weatherData }) {
    const { setSelectedCity, temperatureUnit } = useContext(GlobalContext);

    if (!weatherData)
        return <div></div>;

    return (
            <div className="other-current-weather card" onClick={() => {
                setSelectedCity(`${weatherData.name}, ${weatherData.sys.country}`);
            }}>
                <div>
                    <p className="weather-country">{getCountry(weatherData.sys.country).name}</p>
                    <div className="location-time"><h3 className="weather-city">{weatherData.name}</h3></div>
                    <p className="weather-description">{formatDescription(weatherData.weather[0].description)}</p>
                </div>
                <div>
                    <WeatherIcon weatherId={weatherData.weather[0].id} />
                    <p className="temperature">{convertTempFromKelvin(weatherData.main.temp, temperatureUnit)}°</p>
                </div>
            </div>
    );
}

export default OtherCurrentWeather;