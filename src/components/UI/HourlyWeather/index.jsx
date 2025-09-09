import { useContext } from "react";
import { formatTime } from "../../../helpers/format-helper";
import { convertTempFromKelvin } from "../../../helpers/temperature-helper";
import { GlobalContext } from "../../../contexts/GlobalContext";
import WeatherInfo from "../WeatherInfo";
import "./HourlyWeather.css";

export default function HourlyWeather({ dt, temperature, weatherId, weatherMain }) {
    const { temperatureUnit } = useContext(GlobalContext);

    return (
        <div className="hourly-weather card">
            <p className="hourly-dt">{formatTime(dt)}</p>
            <hr />
            <WeatherInfo weatherId={weatherId} weatherMain={weatherMain} />
            <p className="temperature">{convertTempFromKelvin(temperature, temperatureUnit)}°</p>
        </div>
    );
}