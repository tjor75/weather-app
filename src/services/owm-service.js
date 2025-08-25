import { getCoordFromString } from "../helpers/validation-helper";
import { fetchEndpoint } from "../utils/owm";

export const getWeatherByCoordAsync = async (coord) => {
    const response = await fetchEndpoint("/data/2.5/weather", coord);
    return await response.json();
}

export const getWeatherByCityAsync = async (city) => {
    const response = await fetchEndpoint("/data/2.5/weather", { q: city });
    return await response.json();
}

export const getWeatherBySearchQueryAsync = async (searchQuery) => {
    const coord = getCoordFromString(searchQuery);
    let weather;

    if (coord !== null)
        weather = await getWeatherByCoordAsync(coord);
    else
        weather = await getWeatherByCityAsync(searchQuery);

    return weather;
}