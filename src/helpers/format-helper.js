import { TemperatureUnit } from "../constants/temperature-unit";

const createDateFromUnix = (unixSeconds) => {
    return new Date(unixSeconds * 1000);
}

export const formatTime = (unixSeconds) => {
    const date = createDateFromUnix(unixSeconds);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

const formatDate = (unixSeconds) => {
    const date = createDateFromUnix(unixSeconds);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

export const formatDay = (unixSeconds) => {
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    const date = new Date(unixSeconds * 1000);
    const options = { weekday: 'short' };

    return date <= endToday ? "Today" : date.toLocaleDateString('en-US', options);
}

export const groupWeatherByDay = (list = []) => {
    const group = list.reduce((acc, item) => {
        const day = formatDay(item.dt);

        if (!acc[day])
            acc[day] = { temp_min: Number.MAX_VALUE, temp_max: Number.MIN_VALUE, list: [] };

        if (item.main.temp_min < acc[day].temp_min)
            acc[day].temp_min = item.main.temp_min;
        if (item.main.temp_max > acc[day].temp_max)
            acc[day].temp_max = item.main.temp_max;

        acc[day].list.push(item);

        return acc;
    }, {});

    for (const day in group) {
        group[day].representativeWeather = group[day].list[Math.floor(group[day].list.length / 2)].weather[0];
    }

    return group;
}