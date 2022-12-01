import Header from "./Header";
import EventElems from "./EventElems";
import * as ch from "../../calendarHelper";
import { useState } from "react";

const MainPageElem = ({regEventsArrArg, weekNumArg}) => {
    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendar-container";

    const [regEventsArr, setRegEventsArr] = useState(regEventsArrArg);
    const [weekNum, setWeekNum] = useState(weekNumArg);

    const TimeSlotElem = ({row, col}) => {
        const monthMapping = {1: "JAN", 2: "FEB", 3: "MAR", 4: "APR", 5: "MAY", 6: "JUN", 7: "JUL", 8: "AUG", 9: "SEP", 10: "OCT",
        11: "NOV", 12: "DEC"};

        const HighlightElem = ({weekDay}) => {
            if (weekDay === ch.curWeekDay() && weekNum === 0){
                return (<div id="highlight-cur-day"></div>);
            }
            else {
                return ;
            }
        };

        const weekDates = ch.weekDates(weekNum);
        if (row === 0){
            switch (col){
                case 0:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            {`${monthMapping[ch.weekMonth(weekNum)]}`}<br/>{`${ch.weekYear(weekNum)}`}
                        </div>
                    );
                case 1:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                SUNDAY
                            </div><div className="week-date">{weekDates[0]}</div>
                            <HighlightElem weekDay={0}/>
                        </div>
                    );
                case 2:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                MONDAY
                            </div><div className="week-date">{weekDates[1]}</div>
                            <HighlightElem weekDay={1}/>
                        </div>
                    );
                case 3:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                TUESDAY
                            </div><div className="week-date">{weekDates[2]}</div>
                            <HighlightElem weekDay={2}/>
                        </div>
                    );
                case 4:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                WEDNESDAY
                            </div><div className="week-date">{weekDates[3]}</div>
                            <HighlightElem weekDay={3}/>
                        </div>
                    );
                case 5:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                THURSDAY
                            </div><div className="week-date">{weekDates[4]}</div>
                            <HighlightElem weekDay={4}/>
                        </div>
                    );
                case 6:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                FRIDAY
                            </div><div className="week-date">{weekDates[5]}</div>
                            <HighlightElem weekDay={5}/>
                        </div>
                    );
                case 7:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                            <div className="week-day">
                                SATURDAY
                            </div><div className="week-date">{weekDates[6]}</div>
                            <HighlightElem weekDay={6}/>
                        </div>
                    );
                default:
                    return (
                        <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                        </div>
                    );
            }
        }

        if (col === 0){
            return (
                <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
                    {ch.hourText(row + 7)}
                </div>
            );
        }

        return (
            <div className={`time-slot row-${row} col-${col}`} id={`slot-${row}-${col}`} key={`slot-${row}-${col}`}>
            </div>
        );
    };

    const ColumnElem = ({col}) => {
        let className = "column-grid";
        if (col !== 0){
            className += " day-col";
        }
        const id =  `day-col-${col}`;

        const rows = [];
        for (let row = 24; row >= 0; --row){
            rows.push(TimeSlotElem({row: row, col: col}));
        }

        return (
            <div className={className} id={id} key={id}>
                {rows}
                {EventElems({regEventsArr: regEventsArr, weekNum: weekNum, col: col})}
            </div>
        );
    };

    const Grid = () => {
        const columns = [];
        for (let col = 7; col >= 0; --col) {
            columns.push(ColumnElem({col: col}));
        }

        return (
            <div id="calendar-container">
                {columns}
                <div id="arrow-left" onClick={() => {setWeekNum(weekNum - 1)}}></div>
                <div id="arrow-right" onClick={() => {setWeekNum(weekNum + 1)}}></div>
            </div>
        );
    };

    return (
    <div id="main-container">
        <Header />
        {Grid()}
    </div>
    );
};

export default MainPageElem;