import * as ch from "../../calendarHelper";

const EventTextElem = ({regEvent, weekNum, col}) => {
    if (col <= 0 || col > 7){
        return;
    }

    const middleMoment = ch.middleMoment(regEvent.startDate, regEvent.startTime, regEvent.endDate, regEvent.endTime);
    const middleDateNum = ch.dateAndTimeToNum(middleMoment.date, middleMoment.time);

    const colStartDate = ch.slotToTimeAndDate(1, col, weekNum);
    const colStartDateNum = ch.dateAndTimeToNum(colStartDate.date, colStartDate.time);
    let colEndDate = "";
    if (col === 7){
        colEndDate = ch.slotToTimeAndDate(1, 1, weekNum + 1);
    }
    else{
        colEndDate = ch.slotToTimeAndDate(1, col+1, weekNum);
    }
    const colEndDateNum = ch.dateAndTimeToNum(colEndDate.date, colEndDate.time);

    let top = 0;

    if (middleDateNum >= colStartDateNum && middleDateNum < colEndDateNum){
        top = ch.minsBetweenTimes(colStartDate.time, middleMoment.time)/60/24*100;
    }
    else{
        return ;
    }

    top = top - (1/48)*100;

    if (top < 0){
        return;
    }

    if(top > 100 - (1/24*100)) {
        return;
    }

    const singleSlotVH = 91.6 / 16.5;
    const gridHeightVH = (singleSlotVH * 24);

    const height = ch.minsBetweenTimes(regEvent.startTime, regEvent.endTime)/60/24*100;

    if (height >= 1/24*99){
        return (
            <div id={`event-text-${regEvent.id}`} key={`event-text-${regEvent.id}`} className="event-text" 
            style={{top: `${gridHeightVH * top / 100 + singleSlotVH}vh`}}>
                {`${regEvent.name}`}<br/>{`${ch.from24To12(regEvent.startTime)} - ${ch.from24To12(regEvent.endTime)}`}
            </div>
        );
    }

    if (height >= 1/48*99){
        return (
            <div id={`event-text-${regEvent.id}`} key={`event-text-${regEvent.id}`} className="event-text" 
            style={{top: `${gridHeightVH * top / 100 + singleSlotVH}vh`, lineHeight: `${91.6 / 16.5}vh`}}>
                {`${regEvent.name}`}
            </div>
        );
    }

    return ;
}

export default EventTextElem;