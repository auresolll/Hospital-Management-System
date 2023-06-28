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

export const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
};

export const generateCode = () => {
    const firstCharacter = generateRandomLetter();
    return firstCharacter + Math.floor(100000 + Math.random() * 900000);
};
