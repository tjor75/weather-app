import thunderstorm from "../../../assets/icons/thunderstorm.png";
import drizzle from "../../../assets/icons/drizzle.png";
import rain from "../../../assets/icons/rain.png";
import snow from "../../../assets/icons/snow.png";
import atmosphere from "../../../assets/icons/atmosphere.png";
import clear from "../../../assets/icons/clear.png";
import clouds from "../../../assets/icons/clouds.png";

function WeatherIcon({ weatherId }) {
    const getWeatherIcon = (weatherId) => {
        let weatherIcon;
    
        if (weatherId >= 200 && weatherId < 300)
            weatherIcon = thunderstorm;
        else if (weatherId >= 300 && weatherId < 400)
            weatherIcon = drizzle;
        else if (weatherId >= 500 && weatherId < 600)
            weatherIcon = rain;
        else if (weatherId >= 600 && weatherId < 700)
            weatherIcon = snow;
        else if (weatherId >= 700 && weatherId < 800)
            weatherIcon = atmosphere;
        else if (weatherId === 800)
            weatherIcon = clear;
        else
            weatherIcon = clouds;
    
        return weatherIcon;
    }

    return <img className="weather-icon" src={getWeatherIcon(weatherId)} />;
}

export default WeatherIcon;