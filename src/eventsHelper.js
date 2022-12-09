import * as ch from "./calendarHelper";
import PriorityQueue from "js-priority-queue";

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
        for (let day = 0; day < 7 * 52; ++day){
            const regEvent = {id: `${event.id}-${day}`, type: event.type, name: event.name, progressBar: 0};
            const curStartDate = ch.addDaysToDate(startDate, day);
            const curEndDate = ch.addDaysToDate(endDate, day);
            if(curStartDate > endDate){
                break;
            }
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
            if(curStartDate > endDate){
                break;
            }
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
    newEventsObj = updateSuggs(newEventsObj);
    return newEventsObj;
}

export function addEvent(oldEventsObj, event){
    let newEventsObj = Object.assign({}, oldEventsObj);
    newEventsObj.eventsArr.push(event);
    newEventsObj.noSuggArr = newEventsObj.noSuggArr.concat(singleEventToRegEvents(event));

    newEventsObj = updateSuggs(newEventsObj);

    return newEventsObj;
}

export function toggleSugg(oldEventsObj) {
    const newEventsObj = Object.assign({}, oldEventsObj);
    newEventsObj.showSugg = !newEventsObj.showSugg;
    return newEventsObj;
}

//{eventsArr: null, noSuggArr: null, suggArr: null, showSugg: false}
export function updateSuggs(oldEventsObj) {
    const newEventsObj = {eventsArr: [], noSuggArr: [], suggArr: [], showSugg: oldEventsObj.showSugg};

    const requiredMinsPerDay = (assign) => {
        const requiredTime = (10 + 0.00239 * assign.difficult ** 3) * (100 - assign.compl);
        const timeLeft = ch.minsBetweenDateObjs(ch.dateAndTimeToDateObj(ch.curDate(), ch.curTime()), ch.dateAndTimeToDateObj(assign.dueDate, assign.dueTime));
        if (timeLeft === 0){
            return 1440;
        }
        let timePerDay =  requiredTime/timeLeft * 24 * 60;
        if (timeLeft < 60 * 24 * 2 && timeLeft > 0){
            timePerDay = 60;
        }
        if (timePerDay > 480){
            timePerDay = 480;
        }
        return timePerDay;
    };

    const assignPriorityF = (a, b) => {
        let minsPerDayA = requiredMinsPerDay(a);
        let minsPerDayB = requiredMinsPerDay(b);
        return minsPerDayB - minsPerDayA;
    };

    const assignPriorityQueue = new PriorityQueue({comparator: assignPriorityF});

    for (let i = 0; i < oldEventsObj.eventsArr.length; ++i){
        const event = oldEventsObj.eventsArr[i];
        if (event.type === "assignment") {
            assignPriorityQueue.queue(event);
        }
        if (event.type !== "suggestion"){
            newEventsObj.eventsArr.push(event);
        }
    }

    const slotsCompare = (a, b) => {
        return a.start - b.start;
    }

    const takenSlots = new PriorityQueue({ comparator: slotsCompare });

    for (let i = 0; i < oldEventsObj.noSuggArr.length; ++i){
        const regEvent = oldEventsObj.noSuggArr[i];
        const startNum = ch.dateAndTimeToNum(regEvent.startDate, regEvent.startTime);
        const endNum = ch.dateAndTimeToNum(regEvent.endDate, regEvent.endTime);

        takenSlots.queue({start: startNum, end: endNum});
    }

    const inverseSlots = new PriorityQueue({comparator: slotsCompare});


    while (takenSlots.length > 0){
        const inverseSlot = {start: null, end: null};
        const takenSlot = takenSlots.dequeue();
        if (takenSlots.length > 0 && takenSlot.start > ch.dateObjToNum(new Date())){ //last start date is either deadline, or it does not matter for HW suggestions
            if (inverseSlots.length === 0){
                inverseSlots.queue({start: ch.dateObjToNum(new Date()), end: takenSlot.start});
            }
            inverseSlot.start = takenSlot.end;
            inverseSlot.end = takenSlots.peek().start;
            inverseSlots.queue(inverseSlot);
        }
    }

    const freeSlots = [];

    while (inverseSlots.length > 0) {
        const inverseSlot = inverseSlots.dequeue();
        const freeSlot = {start: null, end: null};
        freeSlot.start = inverseSlot.start;
        freeSlot.end = inverseSlot.end;
        if (freeSlot.start%10000 > 0 && freeSlot.start%10000 < 800){
            if (freeSlot.end%10000 > 0 && freeSlot.end%10000 < 800){
                freeSlot.start = null;
                freeSlot.end = null;
            }
            else{
                freeSlot.start = freeSlot.start - freeSlot.start%10000 + 800;
            }
        }
        else {
            if (freeSlot.end%10000 > 0 && freeSlot.end%10000 < 800){
                freeSlot.end = freeSlot.end - freeSlot.end%10000;
            }
            else{
                let num = ch.dateObjToNum(ch.addDaysToDate(ch.numToDateObj(freeSlot.start), 1));
                let night = num - num%10000;
                const freeSlotCopy = Object.assign({}, freeSlot);
                if (freeSlot.start < night && freeSlot.end > night){
                    freeSlot.end = night;
                }
                while (freeSlotCopy.start < night && freeSlotCopy.end > ch.dateObjToNum(ch.addDaysToDate(ch.numToDateObj(night), 1))){
                    const partSlot = {start: null, end: null};
                    const prevNight = night + 800;
                    freeSlotCopy.start = night;
                    num = ch.dateObjToNum(ch.addDaysToDate(ch.numToDateObj(freeSlotCopy.start), 1));
                    night = num - num%10000;
                    partSlot.start = prevNight;
                    partSlot.end = night;
                    if (ch.minsBetweenDateObjs(ch.numToDateObj(partSlot.start), ch.numToDateObj(partSlot.end)) >= 90){
                        freeSlots.push(partSlot);
                    }
                }
                if (freeSlotCopy.end > night){
                    const partSlot = {start: null, end: null};
                    partSlot.start = night + 800;
                    partSlot.end = freeSlotCopy.end;
                    if (ch.minsBetweenDateObjs(ch.numToDateObj(partSlot.start), ch.numToDateObj(partSlot.end)) >= 90){
                        freeSlots.push(partSlot);
                    }
                }
            }
        }
        if (freeSlot.start !== null && freeSlot.end !== null && ch.minsBetweenDateObjs(ch.numToDateObj(freeSlot.start), ch.numToDateObj(freeSlot.end)) >= 90){
            freeSlots.push(freeSlot);
        }
    }

    while (assignPriorityQueue.length > 0){
        const assign = assignPriorityQueue.dequeue();
        const reqMinsPerDay = requiredMinsPerDay(assign);
        let takenMinsPerDay = 0;
        let curDay = new Date();
        if (reqMinsPerDay > 0){
            for (let i = 0; i < freeSlots.length; ++i){
                const newSugg = {id: `${assign.id}-${newEventsObj.eventsArr.length}`, name: assign.name, type: "suggestion", assignmentId: assign.id,
                    startDate: null, startTime: null, endDate: null, endTime: null};

                if (ch.numToDateObj(freeSlots[i].start) >= ch.addDaysToDate(curDay, 1)){
                    curDay = ch.addDaysToDate(curDay, 1);
                    takenMinsPerDay = 0;
                }
                
                let startStr = null;
                let endStr = null;
                if (ch.minsBetweenDateObjs(ch.numToDateObj(freeSlots[i].start), ch.numToDateObj(freeSlots[i].end)) >= 90){
                    if (ch.minsBetweenDateObjs(ch.numToDateObj(freeSlots[i].start), ch.numToDateObj(freeSlots[i].end)) < reqMinsPerDay - takenMinsPerDay + 30){
                        startStr = ch.dateToStr(ch.addMinsToDate(ch.numToDateObj(freeSlots[i].start), 15));
                        endStr = ch.dateToStr(ch.addMinsToDate(ch.numToDateObj(freeSlots[i].end), -15));
                        takenMinsPerDay = ch.minsBetweenDateObjs(ch.numToDateObj(freeSlots[i].start), ch.numToDateObj(freeSlots[i].end)) - 30;
                    }
                    else{
                        startStr = ch.dateToStr(ch.addMinsToDate(ch.numToDateObj(freeSlots[i].start), 15));
                        endStr = ch.dateToStr(ch.addMinsToDate(ch.numToDateObj(freeSlots[i].start), 15 + reqMinsPerDay - takenMinsPerDay));
                        takenMinsPerDay = reqMinsPerDay;
                    }
                    newSugg.startDate = startStr.date;
                    newSugg.startTime = startStr.time;
                    newSugg.endDate = endStr.date;
                    newSugg.endTime = endStr.time;
                    if (ch.dateAndTimeToDateObj(newSugg.startDate, newSugg.startTime) < ch.dateAndTimeToDateObj(assign.dueDate, assign.dueTime)){
                        if (ch.dateAndTimeToDateObj(newSugg.endDate, newSugg.endTime) > ch.dateAndTimeToDateObj(assign.dueDate, assign.dueTime)){
                            newSugg.endDate = assign.dueDate;
                            newSugg.endTime = assign.dueTime;
                        }
                        if (ch.minsBetweenDateObjs(ch.dateAndTimeToDateObj(newSugg.startDate, newSugg.startTime), ch.dateAndTimeToDateObj(newSugg.endDate, newSugg.endTime)) > 1){
                            newEventsObj.eventsArr.push(newSugg);
                            freeSlots[i].start = ch.dateObjToNum(ch.dateAndTimeToDateObj(newSugg.endDate, newSugg.endTime));
                        }
                    }
                }
            }
        }
    }

    newEventsObj.noSuggArr = eventsToRegEvents(newEventsObj.eventsArr).filter((event) => event.type !== "suggestion");
    newEventsObj.suggArr = eventsToRegEvents(newEventsObj.eventsArr).filter((event) => event.type === "suggestion");

    return newEventsObj;
}