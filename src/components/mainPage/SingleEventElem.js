import * as ch from "../../calendarHelper";

const SingleEventElem = ({regEvent, weekNum, col}) => {
    if (col <= 0 || col > 7){
        return;
    }

    const startDateNum = ch.dateAndTimeToNum(regEvent.startDate, regEvent.startTime);
    const endDateNum = ch.dateAndTimeToNum(regEvent.endDate, regEvent.endTime);
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
    let height = 100;

    if (startDateNum >= colStartDateNum && startDateNum < colEndDateNum) {
        top = ch.minsBetweenTimes(colStartDate.time, regEvent.startTime)/60/24*100;
        if (endDateNum >= colStartDateNum && endDateNum < colEndDateNum) {
            height = ch.minsBetweenTimes(regEvent.startTime, regEvent.endTime)/60/24*100;
        }
        else {
            height = height - top;
        }
    }
    else{
        if (endDateNum >= colStartDateNum && endDateNum < colEndDateNum) {
            height = ch.minsBetweenTimes(colStartDate.time, regEvent.endTime)/60/24*100;
        }
        else {
            if (!(startDateNum < colStartDateNum && endDateNum >= colEndDateNum)){
                return ;
            }
        }
    }

    const singleSlotVH = 91.6 / 16.5;
    const gridHeightVH = (singleSlotVH * 24);

    return (
        <div className={`event-elem event-elem-${regEvent.id} ${regEvent.type}-event`} id={`event-elem-${regEvent.id}-${col}`}
        key={`event-elem-${regEvent.id}-${col}`} style={{
            height: `${gridHeightVH * height / 100}vh`,
            top: `${gridHeightVH * top / 100 + singleSlotVH}vh`
        }}>
            <div className={`prgress-bar progress-bar-${regEvent.type}`} style={{
                height: `${gridHeightVH * height / 100}vh`,
                width: `${regEvent.progressBar}%`
            }}></div>
        </div>
    );
}

export default SingleEventElem;