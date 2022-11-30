import * as ch from "../../calendarHelper";

const EventEndElem = ({regEvent, weekNum, row, col}) => {

    const weekDates = ch.weekDates(weekNum);
    const weekMonth = ch.weekMonth(weekNum);
    const weekYear = ch.weekYear(weekNum);

    const endTime = regEvent.endTime.split(":");
    const endDate = regEvent.endDate.split("-");

    if (parseInt(endDate[2]) === weekDates[col - 1] && parseInt(endDate[1]) === weekMonth && parseInt(endDate[0]) === weekYear 
    && parseInt(endTime[0]) === (row + 7) % 24){

        return (
            <div id={`event-end-${regEvent.id}`} key={`event-end-${regEvent.id}`} className={`${regEvent.type}-event event-end`}
            style={{height: `${endTime[1]/60*100}%`}}>
            </div>
        );
    }
    else {
        return ;
    }
};

export default EventEndElem;