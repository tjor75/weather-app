import { useContext, useEffect, useState } from "react";
import { otherCities } from "../../constants/default.js";
import * as owmService from "../../services/owm-service.js";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";
import OtherCurrentWeather from "../OtherCurrentWeather";

function OtherCities() {
    const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
    const { increasePending, decreasePending } = useContext(GlobalContext);
    
    useEffect(() => {
        increasePending();
        
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
            throw err;
        } finally {
            decreasePending();
        }
    }, []);
    
    if (!(otherCitiesWeather.length > 0))
        return <div></div>;
    
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