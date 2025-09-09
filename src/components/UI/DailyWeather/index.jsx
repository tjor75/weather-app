import { useContext } from "react";
import { convertTempFromKelvin } from "../../../helpers/temperature-helper";
import { GlobalContext } from "../../../contexts/GlobalContext";
import WeatherInfo from "../WeatherInfo";
import TemperatureBar from "../TemperatureBar";
import "./DailyWeather.css";

export default function DailyWeather({ dayLabel, dayData, globalMin, globalMax }) {
    const { temperatureUnit } = useContext(GlobalContext);

    return (
        <div className="daily-weather card">
            <h3>{dayLabel}</h3>
            <WeatherInfo
                weatherId={dayData.representativeWeather.id}
                weatherMain={dayData.representativeWeather.main}
            />
            <div>
                <p title="Mininum temperature">{convertTempFromKelvin(dayData.temp_min, temperatureUnit)}°</p>
                <TemperatureBar
                    day={dayData}
                    globalMin={globalMin}
                    globalMax={globalMax}
                />
                <p title="Maximum temperature">{convertTempFromKelvin(dayData.temp_max, temperatureUnit)}°</p>
            </div>
        </div>
    )
}