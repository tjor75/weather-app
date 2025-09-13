import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_SELECTED_CITY } from "./constants/default.js";
import WeatherApp from "./WeatherApp";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WeatherApp />} />
                <Route path="/:selectedCityLocation" element={<WeatherApp />} />
                {/* Catch-all fallback */}
                <Route
                    path="*"
                    element={<Navigate to={`/`} replace />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;