import * as ch from "../../calendarHelper";

const EventStartElem = ({regEvent, weekNum, row, col}) => {

    const weekDates = ch.weekDates(weekNum);
    const weekMonth = ch.weekMonth(weekNum);
    const weekYear = ch.weekYear(weekNum);

    const startTime = regEvent.startTime.split(":");
    const startDate = regEvent.startDate.split("-");

    if (parseInt(startDate[2]) === weekDates[col - 1] && parseInt(startDate[1]) === weekMonth 
    && parseInt(startDate[0]) === weekYear && parseInt(startTime[0]) === (row + 7) % 24){

        return (
            <div id={`event-start-${regEvent.id}`} key={`event-start-${regEvent.id}`} className={`${regEvent.type}-event event-start`} 
            style={{top: `${(parseInt(startTime[1])%60)/60*100}%`, height: `${100 - ((startTime[1]%60)/60*100)}%`}}>
            </div>
        );
    }
    else {
        return ;
    }
};

export default EventStartElem;