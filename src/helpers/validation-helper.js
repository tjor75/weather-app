export const getCoordFromString = (text) => {
    const regex =
        /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    const result = text.match(regex);
    return result ? { lat: result[1], lon: result[4] } : null;
}