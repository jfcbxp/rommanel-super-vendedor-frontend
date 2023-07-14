const MAX_DAY = 31;
const MAX_MONTH = 12;
const MAX_HOUR = 23;
const MAX_MINUTE = 59;

const isNumeric = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

const formatValue = (value: number): string => {
    return String(value).padStart(2, '0');
};

const extractDateValues = (date: string): [number, number, number] => {
    const [day, month, year] = date.split('/').map(Number);
    return [day, month, year];
};

export const getDateNow = (): string => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${formatValue(day)}/${formatValue(month)}/${year}`;
};

export const fixTime = (time: string): string => {
    const trimmedTime = time.replace(/\s|:/g, '');

    const hour = trimmedTime.slice(0, 2).padStart(2, '0');
    const minute = trimmedTime.slice(2, 4).padStart(2, '0');

    return `${hour}:${minute}`;
};

export const adjustDate = (date?: string): string => {
    if (!date || date.length !== 10) {
        return date!;
    }

    const [day, month, year] = extractDateValues(date);

    if (!isNumeric(day) || !isNumeric(month) || !isNumeric(year)) {
        return date;
    }

    const currentYear = new Date().getFullYear();
    const adjustedDay = formatValue(Math.min(day, MAX_DAY));
    const adjustedMonth = formatValue(Math.min(month, MAX_MONTH));

    if (adjustedDay === '00' || adjustedMonth === '00') {
        return '';
    }

    return `${adjustedDay}/${adjustedMonth}/${currentYear}`;
};

export const adjustTime = (time?: string): string => {
    if (!time || time.length !== 5) {
        return time!;
    }

    const [hour, minute] = time.split(':').map(Number);

    const adjustedHour = formatValue(Math.min(hour, MAX_HOUR));
    const adjustedMinute = formatValue(Math.min(minute, MAX_MINUTE));

    return `${adjustedHour}:${adjustedMinute}`;
};
