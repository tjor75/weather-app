import { useEffect, useState } from "react";
import * as owmService from "../../services/owm-service.js";
import OtherCurrentWeather from "../OtherCurrentWeather/index.jsx";

function OtherCities() {
    const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);

    useEffect(() => {
        const otherCities = ["New York, US", "Copenhagen, DK", "Ho Chi Minh, VN"];
    
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
        }
      }, []);

      return (
        <div className="other-cities">
          <h2>Other large cities</h2>
            <div className="rows">
              {otherCitiesWeather.map(city => (
                  <OtherCurrentWeather key={city.id} weatherData={city} />
              ))}
            </div>
        </div>
      );
}

export default OtherCities;