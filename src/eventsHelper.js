import * as ch from "./calendarHelper";

function eventsToRegEvents(eventsArr){
    let result = [];

    for (let i = 0; i < eventsArr.length; ++i){
        const event = eventsArr[i];
        result = result.concat(singleEventToRegEvents(event));
    }

    return result;
}

function singleEventToRegEvents(event){
    let result = [];
    if (event.type === "class"){
        const startDate = ch.dateAndTimeToDateObj(event.startWeek, event.startTime);
        const endDate = ch.dateAndTimeToDateObj(event.endWeek, event.endTime);
        for (let day = 0; day < 7 * 10; ++day){
            const regEvent = {id: `${event.id}-${day}`, type: event.type, name: event.name, progressBar: 0};
            const curStartDate = ch.addDaysToDate(startDate, day);
            const curEndDate = ch.addDaysToDate(endDate, day);
            if(event.day[curStartDate.getDay()] === true){
                regEvent["startDate"] = ch.dateToStr(curStartDate).date;
                regEvent["startTime"] = ch.dateToStr(curStartDate).time;
                regEvent["endDate"] = ch.dateToStr(curStartDate).date;
                regEvent["endTime"] = ch.dateToStr(curEndDate).time;
                result.push(regEvent);
            }
        }
    }
    if (event.type === "other"){
        const startDate = ch.dateAndTimeToDateObj(event.startWeek, event.startTime);
        const endDate = ch.dateAndTimeToDateObj(event.endWeek, event.endTime);
        for (let day = 0; day < 7 * 10; ++day){
            const regEvent = {id: `${event.id}-${day}`, type: event.type, name: event.name, progressBar: 0};
            const curStartDate = ch.addDaysToDate(startDate, day);
            const curEndDate = ch.addDaysToDate(endDate, day);
            if(event.day[curStartDate.getDay()] === true){
                regEvent["startDate"] = ch.dateToStr(curStartDate).date;
                regEvent["startTime"] = ch.dateToStr(curStartDate).time;
                regEvent["endDate"] = ch.dateToStr(curStartDate).date;
                regEvent["endTime"] = ch.dateToStr(curEndDate).time;
                result.push(regEvent);
            }
        }
    }
    if (event.type === "assignment"){
        const regEvent = {id: event.id, type: "deadline", name: event.name, progressBar: 0};
        const dDate = ch.dateAndTimeToDateObj(event.dueDate, event.dueTime);
        const regEventStartDateObj = new Date(dDate.getFullYear(), dDate.getMonth(), dDate.getDate(), dDate.getHours()-1, dDate.getMinutes());
        const strObj = ch.dateToStr(regEventStartDateObj);
        regEvent["startDate"] = strObj.date;
        regEvent["startTime"] = strObj.time;
        regEvent["endDate"] = event.dueDate;
        regEvent["endTime"] = event.dueTime;
        regEvent["progressBar"] = event.compl;
        result.push(regEvent);
    }
    if (event.type === "suggestion"){
        const regEvent = {id: event.id, type: event.type, name: event.name, progressBar: 0};
        regEvent["startDate"] = event.startDate;
        regEvent["startTime"] = event.startTime;
        regEvent["endDate"] = event.endDate;
        regEvent["endTime"] = event.endTime;
        result.push(regEvent);
    }
    return result;
}

//{eventsArr: null, noSuggArr: null, suggArr: null, showSugg: false}
export function newEventsObj(eventsArr) {
    const regEvents = eventsToRegEvents(eventsArr);
    let newEventsObj = {
        eventsArr: eventsArr,
        noSuggArr: regEvents.filter((regEvent) => regEvent.type !== "suggestion"),
        suggArr: regEvents.filter((regEvent) => regEvent.type === "suggestion"),
        showSugg: false
    };
    newEventsObj = updateSugg(newEventsObj);
    return newEventsObj;
}

export function addEvent(oldEventsObj, event){
    let newEventsObj = Object.assign({}, oldEventsObj);
    newEventsObj.eventsArr.push(event);

    if (event.type === "suggestion"){
        newEventsObj.suggArr = newEventsObj.suggArr.concat(singleEventToRegEvents(event));
    }
    else {
        newEventsObj.noSuggArr = newEventsObj.noSuggArr.concat(singleEventToRegEvents(event));
    }

    newEventsObj = updateSugg(newEventsObj);

    return newEventsObj;
}

export function updateSugg(oldEventsObj) {
    return oldEventsObj;
}

export function toggleSugg(oldEventsObj) {
    const newEventsObj = Object.assign({}, oldEventsObj);
    newEventsObj.showSugg = true;
    return newEventsObj;
}