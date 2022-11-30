import * as ch from "../../calendarHelper";

const EventTextElem = ({regEvent, weekNum, row, col}) => {
    const weekDates = ch.weekDates(weekNum);
    const weekMonth = ch.weekMonth(weekNum);
    const weekYear = ch.weekYear(weekNum);

    const startTime = regEvent.startTime.split(":");
    const startDate = regEvent.startDate.split("-");
    const endTime = regEvent.endTime.split(":");
    const endDate = regEvent.endDate.split("-");

    const startNum = startDate[0]*10**8 + startDate[1]*10**6 + startDate[2]*10**4 + startTime[0]*10**2 + parseInt(startTime[1]);
    const endNum = endDate[0]*10**8 + endDate[1]*10**6 + endDate[2]*10**4 + (endTime[0]-1)*10**2 + parseInt(endTime[1]);
    const slotNum = weekYear*10**8 + weekMonth*10**6 + weekDates[col-1]*10**4 + ((row + 7) % 24)*10**2;
    const middle = Math.floor(startNum + endNum)/2;
    const middleSlot = Math.ceil(middle/100);

    console.log();

    if (slotNum/100 === middleSlot){

        return (
            <div id={`event-text-${regEvent.id}`} key={`event-text-${regEvent.id}`} className="event-text" style={{bottom: `${150-middle/100%60/60*100}%`}}>
                {`${regEvent.name}`}<br/>{`${ch.from24To12(regEvent.startTime)}-${ch.from24To12(regEvent.endTime)}`}
            </div>
        );
    }
    else {
        return ;
    }

}

export default EventTextElem;