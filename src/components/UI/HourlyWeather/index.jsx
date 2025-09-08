import { convertKelvinToCelsius, formatTime } from "../../../helpers/format-helper";
import WeatherInfo from "../WeatherInfo";
import "./HourlyWeather.css";

export default function HourlyWeather({ dt, temperature, weatherId, weatherMain }) {
    return (
        <div className="hourly-weather card">
            <p className="hourly-dt">{formatTime(dt)}</p>
            <hr />
            <WeatherInfo weatherId={weatherId} weatherMain={weatherMain} />
            <p className="temperature">{convertKelvinToCelsius(temperature)}°</p>
        </div>
    );
}