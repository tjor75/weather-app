import { convertKelvinToCelsius, formatTime } from "../../../helpers/format-helper";
import WeatherIcon from "../WeatherIcon";
import "./HourlyWeather.css";

export default function HourlyWeather({ dt, temperature, weatherId, weather }) {
    return (
        <div className="hourly-weather card">
            <p className="hourly-dt">{formatTime(dt)}</p>
            <hr />
            <WeatherIcon weatherId={weatherId} />
            <p>{weather}</p>
            <p className="temperature">{convertKelvinToCelsius(temperature)}°</p>
        </div>
    );
}