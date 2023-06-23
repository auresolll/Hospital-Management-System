export const getISOToHoursMinutes = (date: Date) => {
    if (!date) {
        return '';
    }
    return Date.parse(date.toString());
};

export const getISOToDayMonthYear = (date: Date) => {
    if (!date) {
        return '';
    }
    return Date.parse(date.toString());
};
