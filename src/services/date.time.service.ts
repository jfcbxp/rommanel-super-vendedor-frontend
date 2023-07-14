export const getDateNow = () => {
    const date = new Date();
    let day = date.getDate().toString();
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    let month = (date.getMonth() + 1).toString();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

export const fixTime = (time: string) => {
    time = time.trim().replace(/\s/g, '').replace(':', '');
    if (time.length == 1) {
        time = `0${time}:00`;
    } else if (time.length == 2) {
        time = `${time}:00`;
    } else {
        let hour = time.slice(0, 2);
        let minute = time.slice(2, 4);
        time = `${hour}:${minute}`;
    }
    return time;
};

export const adjustDate = (date?: string) => {
    if (!date) {
        return ''
    } else {
        const dateArray: string[] = date.split('/');
        let day = parseInt(dateArray[0], 10);
        let month = parseInt(dateArray[1], 10);
        let year = parseInt(dateArray[2], 10);

        if (date.length !== 10) {
            return date
        };

        const currentDate = new Date();

        if (day > 31) {
            day = 31
        };

        if (month > 12) {
            month = 12
        };

        if (year > currentDate.getFullYear()) {
            year = currentDate.getFullYear()
        };

        const _day = day.toString().padStart(2, '0');
        const _month = month.toString().padStart(2, '0');

        return `${_day}/${_month}/${year}`;
    };

};

export const adjustTime = (time?: string) => {
    if (!time) {
        return ''
    } else {
        const timeArray: string[] = time.split(':');
        let hour = parseInt(timeArray[0], 10);
        let minute = parseInt(timeArray[1], 10);

        if (time.length !== 5) return time;

        if (hour > 23) {
            hour = 23
        };

        if (minute > 59) {
            minute = 59
        };

        const _hour = hour.toString().padStart(2, '0');
        const _minute = minute.toString().padStart(2, '0');

        return `${_hour}:${_minute}`;
    };

};
