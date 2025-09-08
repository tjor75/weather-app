import WeatherIcon from "../WeatherIcon";
import "./WeatherInfo.css";

export default function WeatherInfo({ weatherId, weatherMain }) {
    return (
        <div className="weather-info">
            <WeatherIcon weatherId={weatherId} />
            <p>{weatherMain}</p>
        </div>
    );
}