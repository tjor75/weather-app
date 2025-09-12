import { useEffect, useState } from "react";
import * as owmService from "../../services/owm-service.js";
function OtherCities() {
    const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);

    useEffect(() => {
        const otherCities = ["New York, US", "Copenhaggen, DK", "Ho Chi Minh, VN"];
    
        try {
          otherCities.forEach(async (city) => {
            const weatherData = await owmService.getWeatherBySearchQueryAsync(city);
            setOtherCitiesWeather(prevState => {
              if (prevState.find(c => c.id === weatherData.id)) return prevState;
              return [...prevState, weatherData];
            });
          });
        } catch (err) {
          console.error(err);
          //setError(err.message || 'Failed to fetch weather data for other cities.');
        }
      }, []);

      return
}

export default OtherCities;