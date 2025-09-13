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
      {Object.keys(TemperatureUnit).map((unit) => (
        <button 
          key={TemperatureUnit[unit]} 
          className={TemperatureUnit[unit] === temperatureUnit ? "active" : ""}
          onClick={() => handleClick(TemperatureUnit[unit])}
          title={`Switch to ${unit}`}
        >
          °{TemperatureUnit[unit]}
        </button>
      ))}
    </div>
  );
}
