import { fetchEndpoint } from "../utils/owm";

export const getWeatherByCityAsync = async (city) => {
    const response = await fetchEndpoint("/weather", { q: city });
    return await response.json();
}

export const getWeatherByCoordAsync = async (lon, lat) => {
    const response = await fetchEndpoint("/weather", { lon, lat });
    return await response.json();
}