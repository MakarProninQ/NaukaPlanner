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

export function dateAndTimeToNum(date, time){
    const dateArr = date.split("-");
    const timeArr = time.split(":");
    const num = dateArr[0]*10**8 + dateArr[1]*10**6 + dateArr[2]*10**4 + timeArr[0]*10**2 + parseInt(timeArr[1]);
    return num;
}

export function minsBetweenTimes(time1, time2){
    const hour1 = parseInt(time1.split(":")[0]);
    const min1 = parseInt(time1.split(":")[1]);
    const hour2 = parseInt(time2.split(":")[0]);
    const min2 = parseInt(time2.split(":")[1]);
    const result =  (60*24 + ((hour2*60+min2) - (hour1*60+min1)))%(60*24);
    return result;
}

export function slotToTimeAndDate(row, col, weekNum){
    let weekDts = weekDates(weekNum);
    let month = weekMonth(weekNum);
    let year = weekYear(weekNum);

    const minute = "00";
    let hour = (row + 7) % 24;
    let date = weekDts[col - 1];
    if ((row + 7) >= 24){
        if (col === 7){
            date = weekDates(weekNum+1)[0];
        }
        else{
            date = weekDts[col];
        }
    }
    if (weekDts[0] > date){
        month = weekMonth(weekNum + 1);
        if (month === 1){
            year += 1;
        }
    }

    return {date: `${year}-${month}-${date}`, time: `${hour}:${minute}`}; //{date: "yyyy-mm-dd", time: "hh:mm"};
}

export  function dateAndTimeToDateObj(date, time){
    const dateArr = date.split("-");
    const timeArr = time.split(":");
    const dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1])
    return dateObj;
}

export function middleMoment(date1, time1, date2, time2) {
    const dateArr1 = date1.split("-");
    const timeArr1 = time1.split(":");
    const mins = (dateAndTimeToDateObj(date2, time2) - dateAndTimeToDateObj(date1, time1))/120000;
    let moment = new Date(dateArr1[0], dateArr1[1] - 1, dateArr1[2], timeArr1[0], parseInt(timeArr1[1])+mins);
    const result =  {date: `${moment.getFullYear()}-${moment.getMonth() + 1}-${moment.getDate()}`, time: `${moment.getHours()}:${moment.getMinutes()}`};
    return result; //{date: "yyyy-mm-dd", time: "hh:mm"}
}