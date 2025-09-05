export const searchLastTodayByUnix = (array) => {
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    let pos = array.length - 1;
    while (pos >= 0 && new Date(array[pos].dt * 1000) > endToday) {
        pos--;
    }

    return pos;
}