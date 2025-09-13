/*export const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue);
    } catch (err) {
        console.error("Error loading from localStorage", err);
        return defaultValue;
    }
}

export const saveToLocalStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (err) {
        console.error("Error saving to localStorage", err);
    }
}*/