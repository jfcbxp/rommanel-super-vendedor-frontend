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
    if (date) {
        if (date.length == 10) {
            let day = parseInt(date.substring(0, 2), 10);
            let month = parseInt(date.substring(3, 5), 10);
            let year = parseInt(date.substring(6, 10), 10);
            const date_ = new Date();
            if (day > 31) {
                day = 31;
            }
            if (month > 12) {
                month = 12;
            }
            if (year > date_.getFullYear()) {
                year = date_.getFullYear();
            }
            return `${day}/${month}/${year}`;
        } else {
            return date;
        }
    } else {
        return '';
    }
};

export const adjustTime = (time?: string) => {
    if (time) {
        if (time.length == 5) {
            let hour = parseInt(time.substring(0, 2), 10);
            let minute = parseInt(time.substring(3, 5), 10);
            if (hour > 23) {
                hour = 23;
            }
            if (minute > 59) {
                minute = 59;
            }
            return `${hour}:${minute}`;
        } else {
            return time;
        }
    } else {
        return '';
    }
};
