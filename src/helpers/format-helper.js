export const formatTime = (unixSeconds) => {
    const date = new Date(unixSeconds * 1000);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

export const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
}

export const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * (9/5) + 32);
}