import "./TemperatureBar.css";

const TemperatureBar = ({ day, globalMin, globalMax }) => {
  const left = ((day.temp_min - globalMin) / (globalMax - globalMin)) * 100;
  const width = ((day.temp_max - day.temp_min) / (globalMax - globalMin)) * 100;

  return (
    <div className="temperature-bar">
      <div className="temperature-range" style={{ left: `${left}%`, width: `${width}%` }} />
    </div>
  );
};

export default TemperatureBar;
