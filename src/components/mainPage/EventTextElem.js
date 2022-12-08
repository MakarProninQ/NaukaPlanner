import * as ch from "../../calendarHelper";

const EventTextElem = ({regEvent, weekNum, col}) => {
    if (col <= 0 || col > 7){
        return;
    }

    const middleMoment = ch.middleMoment(regEvent.startDate, regEvent.startTime, regEvent.endDate, regEvent.endTime);
    const middleDateNum = ch.dateAndTimeToNum(middleMoment.date, middleMoment.time);

    const colStartDate = ch.slotToTimeAndDate(1, col, weekNum);
    const colStartDateNum = ch.dateAndTimeToNum(colStartDate.date, colStartDate.time);
    let colEndDate = null;
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

    if (top < 0){
        if (ch.minsBetweenTimes(colStartDate.time, regEvent.endTime)/60/24*100 < 1/48*100){
            return;
        }
        else {
            top = 0;
        }
    }

    if(top > 100 - (1/24*100)) {
        if (ch.minsBetweenTimes(regEvent.startTime, colEndDate.time)/60/24*100 < 1/48*100){
            return;
        }
        if (ch.minsBetweenTimes(regEvent.startTime, colEndDate.time)/60/24*100 < 1/24*100)
        {
            top = (47/48) * 100;
        }
        else {
            top = (23/24) * 100;
        }
    }

    const singleSlotVH = 91.6 / 16.5;
    const gridHeightVH = (singleSlotVH * 24);

    let height = ch.minsBetweenTimes(regEvent.startTime, regEvent.endTime)/60/24*100;
    if (Math.floor(ch.dateAndTimeToNum(regEvent.startDate, regEvent.startTime)/10000) === Math.floor(colEndDateNum/10000)){
        height = Math.min(height, ch.minsBetweenTimes(regEvent.startTime, colEndDate.time)/60/24*100);
    }
    if (Math.floor(ch.dateAndTimeToNum(regEvent.endDate, regEvent.endTime)/10000) === Math.floor(colStartDateNum/10000)){
        height = Math.min(height, ch.minsBetweenTimes(colStartDate.time, regEvent.endTime)/60/24*100);
    }


    if (height >= 1/24*99){
        top = top - 1/48*100;
        return (
            <div id={`event-text-${regEvent.id}`} key={`event-text-${regEvent.id}`} className="event-text" 
            style={{top: `${gridHeightVH * top / 100 + singleSlotVH}vh`}}>
                {`${regEvent.name}`}<br/>{`${ch.from24To12(regEvent.startTime)} - ${ch.from24To12(regEvent.endTime)}`}
            </div>
        );
    }

    if (height >= 1/48*99){
        top = top - 1/96*100;
        return (
            <div id={`event-text-${regEvent.id}`} key={`event-text-${regEvent.id}`} className="event-text" 
            style={{top: `${gridHeightVH * top / 100 + singleSlotVH}vh`}}>
                {`${regEvent.name}`}
            </div>
        );
    }

    return ;
}

export default EventTextElem;