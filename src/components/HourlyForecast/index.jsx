import HourlyWeather from "../UI/HourlyWeather";
import "./HourlyForecast.css";

function HourlyForecast({ forecastData }) {
    if (!(forecastData && forecastData.length > 0))
        return <div></div>;

    return (
        <div className="hourly-forecast">
            {forecastData.map(forecast => (
                <HourlyWeather
                    key={forecast.dt}
                    dt={forecast.dt}
                    temperature={forecast.main.temp}
                    weatherId={forecast.weather[0].id}
                    weatherMain={forecast.weather[0].main}
                />
            ))}
        </div>
    );
}

export default HourlyForecast;