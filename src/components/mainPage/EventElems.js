import EventStartElem from "./EventStartElem";
import EventMiddleElem from "./EventMiddleElem";
import EventEndElem from "./EventEndElem";
import EventTextElem from "./EventTextElem";

const EventElems = ({regEventsArr, weekNum, row, col}) => {
    const eventElemArr = [];
    for (let i = 0; i < regEventsArr.length; ++i){
        eventElemArr.push(EventStartElem({regEvent: regEventsArr[i], weekNum: weekNum, row: row, col: col}));
        eventElemArr.push(EventMiddleElem({regEvent: regEventsArr[i], weekNum: weekNum, row: row, col: col}));
        eventElemArr.push(EventEndElem({regEvent: regEventsArr[i], weekNum: weekNum, row: row, col: col}));
        eventElemArr.push(EventTextElem({regEvent: regEventsArr[i], weekNum: weekNum, row: row, col: col}));
    }

    if (eventElemArr.length !== 0){
        return (eventElemArr);
    }
    else {
        return ;
    }
}

export default EventElems;