export const searchLastTodayByUnix = async (list) => {
    // Encuentra el primer elemento que pertenece a "mañana" en hora local
    if (!Array.isArray(list)) {
        console.warn('[searchLastTodayByUnix] Lista inválida');
        return 0;
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const startOfTomorrowMs = startOfTomorrow.getTime();

    const pivotIndex = list.findIndex((item) => {
        const raw = typeof item === 'number' ? item : item?.dt;
        if (raw == null) return false;
        const ms = raw < 1e12 ? raw * 1000 : raw; // dt en segundos (OWM) -> ms
        return ms >= startOfTomorrowMs;
    });

    const result = pivotIndex === -1 ? list.length : pivotIndex;

    // Logs útiles para depurar
    console.log('[searchLastTodayByUnix] startOfTomorrow:', startOfTomorrow.toString());
    console.log('[searchLastTodayByUnix] pivotIndex:', pivotIndex, '-> result:', result);

    return result;
}