import { getCoordFromString } from "../helpers/validation-helper";
import { fetchEndpoint } from "../utils/owm";

export const getWeatherByCoordAsync = async (coord) => {
    return await fetchEndpoint("/data/2.5/weather", coord);
}

export const getWeatherByQueryAsync = async (query) => {
    return await fetchEndpoint("/data/2.5/weather", { q: query });
}

export const getWeatherBySearchQueryAsync = async (searchQuery) => {
    const coord = getCoordFromString(searchQuery);
    let weather;

    if (coord !== null)
        weather = await getWeatherByCoordAsync(coord);
    else
        weather = await getWeatherByQueryAsync(searchQuery);

    return weather;
}

export const getHourlyForecastByCoordAsync = async (coord) => {
    return await fetchEndpoint("/data/2.5/forecast/daily", coord);
}

export const getDailyForecastByCoordAsync = async (coord) => {
    return await fetchEndpoint("/data/2.5/forecast", coord);
}