import WeatherInfo from "../WeatherInfo";
import TemperatureBar from "../TemperatureBar";
import "./DailyWeather.css";

export default function DailyWeather({ dayLabel, dayData, globalMin, globalMax }) {
    return (
        <div className="daily-weather card">
            <h3>{dayLabel}</h3>
            <WeatherInfo
                weatherId={dayData.representativeWeather.id}
                weatherMain={dayData.representativeWeather.main}
            />
            <TemperatureBar
                day={dayData}
                globalMin={globalMin}
                globalMax={globalMax}
            />
        </div>
    )
}