export default function HourlyWeather({ hour, temperature, weatherId, weatherDescription }) {
    return (
        <div className="hourly-weather">
            <p>{hour}</p>
            <WeatherIcon weatherId={weatherId} />
            <p>{weatherDescription}</p>
            <p>{temperature}</p>
        </div>
    );
}