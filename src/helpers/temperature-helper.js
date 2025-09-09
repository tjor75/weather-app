import { TemperatureUnit } from "../constants/temperature-unit";

const convertKelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
}

const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * (9/5) + 32);
}

export const convertTempFromKelvin = (kelvin, toUnit) => {
    let newTemp;

    switch (toUnit) {
        case TemperatureUnit.CELSIUS:
            newTemp = convertKelvinToCelsius(kelvin);
            break;
        case TemperatureUnit.FAHRENHEIT:
            newTemp = convertKelvinToFahrenheit(kelvin);
            break;
    }

    return newTemp;
}