export function curTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

export function curDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function curWeekDay() {
    const date = new Date();
    return date.getDay(); //0 = Sunday, 6 = Saturday
}

export function weekDates(weekNum) { //0 for current week
    const weekDatesArr = [];
    const curDate = new Date();
    for (let i = 0 + (7 * weekNum); i < 7 + (7 * weekNum); ++i) {
        const weekDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - curDate.getDay() + i);
        weekDatesArr.push(weekDate.getDate());
    }
    return weekDatesArr;
}

export function weekMonth(weekNum) { //0 for current week
    const curDate = new Date();
    const weekDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - curDate.getDay() + (7 * weekNum));
    return weekDate.getMonth() + 1; //1-12
}

export function weekYear(weekNum) { //0 for current week
    const curDate = new Date();
    const weekDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - curDate.getDay() + (7 * weekNum));
    return weekDate.getFullYear();
}

export function hourText(hour) { //0-24
    let text;
    if (hour % 12 === 0){
        text = "12 ";
    }
    else{
        text = `${hour % 12} `;
    }
    if (hour % 24 < 12){ 
        text += "am";
    }
    else {
        text += "pm";
    }

    return text;
}

export function from24To12(time) { //hh:mm
    const hour = time.split(":")[0];
    const min = time.split(":")[1];
    let text;
    if (hour % 12 === 0){
        text = `12:${min}`;
    }
    else{
        text = `${hour % 12}:${min}`;
    }
    if (hour % 24 < 12){ 
        text += "am";
    }
    else {
        text += "pm";
    }

    return text;
}