import { useState } from "react";
import MainPageElem from "../components/mainPage/MainPageElem";
import PopUpWindow from "../components/PopUpWindow"
import Events from "../Events";

const event1 = {id: "2b34", type: "class", name: "Learn React", startTime: "00:00", startWeek: "2022-12-1",
endTime: "23:55", endWeek: "2023-1-2", day: [false, false, false, true, true, false, true], link: "https://link",
notes: "This is notes", location: "Orenburg"};
const event2 = {id: "2b234", type: "assignment", name: "Assign Important", dueTime: "15:15", dueDate: "2022-11-30",
link: "https://link", class: "Learn React", compl: 5, difficult: 10, notes: "MyNotes", progressBar: 60};

const AppComponent = () => {

    const [eventsObj, setEventsObj] = useState(new Events([event1, event2]));
    const [popUp, setPopUp] = useState({show: false, type: null, eventId: null});
    
    return (
  
      <div className="app-container">
        <MainPageElem eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp} weekNumArg={0}/>
        <PopUpWindow eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp}/>
      </div>
    );
}

export default AppComponent;