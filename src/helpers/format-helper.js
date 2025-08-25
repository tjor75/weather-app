export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', options);
    return formattedTime;
}

export const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
}

export const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * (9/5) + 32);
}