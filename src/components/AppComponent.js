import { useState } from "react";
import MainPageElem from "../components/mainPage/MainPageElem";
import PopUpWindow from "../components/PopUpWindow";
import * as eventsHelper from "../eventsHelper";

const event1 = {id: "2b34", type: "class", name: "Learn React", startTime: "15:00", startWeek: "2022-12-1",
endTime: "17:40", endWeek: "2023-1-2", day: [false, false, false, true, true, false, true], link: "https://link",
notes: "This is notes", location: "Orenburg"};
const event2 = {id: "2b234", type: "assignment", name: "Assign Important", dueTime: "15:15", dueDate: "2022-11-30",
link: "https://link", class: "Learn React", compl: 50, difficult: 10, notes: "MyNotes"};
const event3 = {id: "1231d2f3", type: "suggestion", name: "New Suggestion", startDate: "2022-12-2",
startTime: "13:33", endDate: "2022-12-2", endTime: "17:48", assignmentId: "2b234"};

const AppComponent = () => {
    const eventsArr = [event1, event2, event3];
    const [eventsObj, setEventsObj] = useState(eventsHelper.newEventsObj(eventsArr));
    const [popUp, setPopUp] = useState({show: false, type: null, eventId: null});
    
    return (
  
      <div className="app-container">
        <MainPageElem eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp} weekNumArg={0}/>
        <PopUpWindow eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp}/>
      </div>
    );
}

export default AppComponent;