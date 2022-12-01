import * as ch from "./calendarHelper";

export default class Events{
    constructor(eventsArr){
        this.eventsArr = eventsArr;
        this.noSuggArr = this.eventsToRegEvents();
        this.suggestionsArr = this.suggestionsToRegEvents();
        this.regEventsArr = this.noSuggArr;
    }

    eventsToRegEvents(){

        const result = [];

        for (let i = 0; i < this.eventsArr.length; ++i){
            const event = this.eventsArr[i];
            if (event.type === "class"){
                const startDate = ch.dateAndTimeToDateObj(event.startWeek, event.startTime);
                const endDate = ch.dateAndTimeToDateObj(event.endWeek, event.endTime);
                for (let day = 0; day < 7 * 10; ++day){
                    const regEvent = {id: event.id, type: event.type, name: event.name, progressBar: 0};
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
                    const regEvent = {id: event.id, type: event.type, name: event.name, progressBar: 0};
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
                result.push(regEvent);
            }
        }

        return result;
    }

    suggestionsToRegEvents(){
        const result = [];

        for (let i = 0; i < this.eventsArr.length; ++i){
            const event = this.eventsArr[i];
            if (event.type === "suggestion"){
                const regEvent = {id: event.id, type: event.type, name: event.name, progressBar: 0};
                regEvent["startDate"] = event.startDate;
                regEvent["startTime"] = event.startTime;
                regEvent["endDate"] = event.endDate;
                regEvent["endTime"] = event.endTime;
                result.push(regEvent);
            }
        }

        return result;
    }

    addSuggToRegEvents(){
        this.regEventsArr = this.noSuggArr.concat(this.suggestionsArr);

        return this.regEventsArr;
    }
}