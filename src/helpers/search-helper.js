export const searchLastTodayByUnix = async (list) => {
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    let pos = list.length - 1;
    while (pos >= 0 && new Date(list[pos].dt * 1000) > endToday) {
        pos--;
    }

    return pos;
}