import SearchForm from "../SearchForm";
import TemperatureUnitSwitch from "../UI/TemperatureUnitSwitch";
import ThemeSwitch from "../UI/ThemeSwitch";
import About from "../About";
import "./Options.css";

export default function Options() {
    return (
        <div className="options">
            <SearchForm />
            <div>
                <TemperatureUnitSwitch />
                <ThemeSwitch />
                <About />
            </div>
        </div>
    );
}