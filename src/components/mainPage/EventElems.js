import SingleEventElem from "./SingleEventElem";
import EventTextElem from "./EventTextElem";

const EventElems = ({eventsObj, weekNum, col}) => {
    const eventElemArr = [];

    let regEventsArr = [];
    if (eventsObj.showSugg){
        regEventsArr = eventsObj.suggArr;
    }

    regEventsArr = regEventsArr.concat(eventsObj.noSuggArr);

    for (let i = 0; i < regEventsArr.length; ++i){
        eventElemArr.push(SingleEventElem({regEvent: regEventsArr[i], weekNum: weekNum, col: col}));
        eventElemArr.push(EventTextElem({regEvent: regEventsArr[i], weekNum: weekNum, col: col}));
    }

    if (eventElemArr.length !== 0){
        return (eventElemArr);
    }
    return ;
}

export default EventElems;