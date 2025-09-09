import { useContext, useCallback } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { TemperatureUnit } from "../../../constants/temperature-unit";
import "./TemperatureUnitSwitch.css";

export default function TemperatureUnitSwitch({ className = "" }) {
  const { temperatureUnit, setTemperatureUnit } = useContext(GlobalContext);

  const handleClick = useCallback((unit) => {
    if (unit !== temperatureUnit) {
      setTemperatureUnit(unit);
    }
  }, [temperatureUnit, setTemperatureUnit]);

  return (
    <div className={`temperature-unit-switch ${className}`}>      
      <button
        type="button"
        aria-label="Show temperatures in Celsius"
        aria-pressed={temperatureUnit === TemperatureUnit.CELSIUS}
        className={temperatureUnit === TemperatureUnit.CELSIUS ? "active" : ""}
        onClick={() => handleClick(TemperatureUnit.CELSIUS)}
      >
        °C
      </button>
      <button
        type="button"
        aria-label="Show temperatures in Fahrenheit"
        aria-pressed={temperatureUnit === TemperatureUnit.FAHRENHEIT}
        className={temperatureUnit === TemperatureUnit.FAHRENHEIT ? "active" : ""}
        onClick={() => handleClick(TemperatureUnit.FAHRENHEIT)}
      >
        °F
      </button>
    </div>
  );
}
