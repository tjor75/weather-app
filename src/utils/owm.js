import owmConfig from "../configs/owm-config";

const BASE_URL = "https://api.openweathermap.org";

const generateURL = async (endpoint, paramsObj) => {
    const searchParams = new URLSearchParams();

    searchParams.append("appid", owmConfig.API_KEY);
    for (const paramsObjKey in paramsObj)
        searchParams.append(paramsObjKey, paramsObj[paramsObjKey]);

    return `${BASE_URL}${endpoint}?${searchParams.toString()}`;
}

export const fetchEndpoint = async (endpoint, paramsObj) => {
    const url = await generateURL(endpoint, paramsObj);
    
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (!response.ok)
            throw Error(json.message);

        return json;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw Error(error.message);
    }
};