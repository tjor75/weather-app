import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_SELECTED_CITY } from "./constants/default.js";
import WeatherApp from "./WeatherApp";

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* Redirect root to default city (URL-encoded) */}
                <Route
                    path="/"
                    element={<Navigate to={`/${encodeURIComponent(DEFAULT_SELECTED_CITY)}`} replace />}
                />
                <Route path="/:selectedCityLocation" element={<WeatherApp />} />
                {/* Catch-all fallback */}
                <Route
                    path="*"
                    element={<Navigate to={`/${encodeURIComponent(DEFAULT_SELECTED_CITY)}`} replace />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;