import { useEffect, useState } from "react";
import DailyWeather from "../UI/DailyWeather";
import "./DailyForecast.css";

function DailyForecast({ forecastData = {} }) {
    const [globalMin, setGlobalMin] = useState(null);
    const [globalMax, setGlobalMax] = useState(null);

    useEffect(() => {
        setGlobalMin(Math.min(...Object.values(forecastData).map(d => d.temp_min)));
        setGlobalMax(Math.max(...Object.values(forecastData).map(d => d.temp_max)));
    }, [forecastData]);
    
    return (
        Object.keys(forecastData).length > 0 && (
            <div className="daily-forecast">
                <h2>5-day forecast</h2>
                <div className="daily-rows">
                    {Object.keys(forecastData).map((dayLabel) => {
                        const dayData = forecastData[dayLabel];
                        return (
                            <DailyWeather 
                                key={"forecast" + dayLabel}
                                dayLabel={dayLabel}
                                dayData={dayData}
                                globalMin={globalMin}
                                globalMax={globalMax}
                            />
                        );
                    })}
                </div>
            </div>
        )
    );
}

export default DailyForecast;