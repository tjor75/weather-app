import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import WeatherApp from "./WeatherApp";

function App() {
    const DEFAULT_CITY = "Buenos Aires, AR";
    
    return (
        <HashRouter>
            <Routes>
                {/* Redirect root to default city (URL-encoded) */}
                <Route
                    path="/"
                    element={<Navigate to={`/${encodeURIComponent(DEFAULT_CITY)}`} replace />}
                />
                <Route path="/:selectedCityLocation" element={<WeatherApp />} />
                {/* Catch-all fallback */}
                <Route
                    path="*"
                    element={<Navigate to={`/${encodeURIComponent(DEFAULT_CITY)}`} replace />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;