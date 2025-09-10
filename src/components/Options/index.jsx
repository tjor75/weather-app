import SearchForm from "../SearchForm";
import TemperatureUnitSwitch from "../UI/TemperatureUnitSwitch";
import "./Options.css";

export default function Options() {
    return (
        <div className="options">
            <SearchForm />
            <TemperatureUnitSwitch />
        </div>
    );
}