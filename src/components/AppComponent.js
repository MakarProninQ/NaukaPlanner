import { useState } from "react";
import MainPageElem from "../components/mainPage/MainPageElem";
import PopUpWindow from "../components/PopUpWindow";
import * as eventsHelper from "../eventsHelper";

const event1 = {id: "2b34", type: "class", name: "ART-HIST 100H", startTime: "11:15", startWeek: "2022-9-1",
endTime: "12:05", endWeek: "2023-2-2", day: [false, true, false, true, false, false, false], link: "https://moodle",
notes: "No notes", location: "Thompson Hall 102"};
const event2 = {id: "2bweak34", type: "class", name: "COMPSCI 383", startTime: "16:00", startWeek: "2022-9-1",
endTime: "17:15", endWeek: "2023-2-2", day: [false, true, false, true, false, false, false], link: "https://moodle",
notes: "No notes", location: "Thompson Hall 104"};
const event3 = {id: "2bweak02r34", type: "class", name: "COMPSCI 325", startTime: "10:00", startWeek: "2022-9-1",
endTime: "11:15", endWeek: "2023-2-2", day: [false, false, true, false, true, false, false], link: "https://moodle",
notes: "No notes", location: "Learning Center S211"};
const event4 = {id: "2b2r34", type: "class", name: "COMPSCI 311", startTime: "11:30", startWeek: "2022-9-1",
endTime: "12:45", endWeek: "2023-2-2", day: [false, false, true, false, true, false, false], link: "https://moodle",
notes: "No notes", location: "Goessmann Laboratory 20"};
const event5 = {id: "2g4", type: "class", name: "COMPSCI 360", startTime: "13:00", startWeek: "2022-9-1",
endTime: "14:15", endWeek: "2023-2-2", day: [false, false, true, false, true, false, false], link: "https://moodle",
notes: "No notes", location: "Martson Hall 132"};
const event6 = {id: "2b34afs5634", type: "class", name: "ART-HIST 100H-01AA", startTime: "11:15", startWeek: "2022-9-1",
endTime: "12:05", endWeek: "2023-2-2", day: [false, false, false, false, false, true, false], link: "https://moodle",
notes: "No notes", location: "South College E245"};
const event7 = {id: "2bag4a4", type: "class", name: "COMPSCI 311-01AC", startTime: "12:20", startWeek: "2022-9-1",
endTime: "13:10", endWeek: "2023-2-2", day: [false, false, false, false, false, true, false], link: "https://moodle",
notes: "No notes", location: "Lederle Grad. Research Tower 121"};
const event8 = {id: "2b3fa14", type: "assignment", name: "Challenge Problems", dueTime: "23:59", dueDate: "2022-12-15",
link: "https://link", class: "COMPSCI311", compl: 50, difficult: 15, notes: "MyNotes"};
/*const event9 = {id: "123d1d2f3", type: "suggestion", name: "New Suggestion", startDate: "2022-12-2",
startTime: "13:33", endDate: "2022-12-2", endTime: "17:48", assignmentId: "2b234"};*/
const event9  = {id: "2b1a34", type: "other", name: "Presentation", startTime: "13:40", startWeek: "2022-12-9",
endTime: "14:40", endWeek: "2023-12-11", day: [true, true, false, true, false, false, true], link: "https://link",
notes: "This is notes", location: "Online"};
const event10  = {id: "242b3442", type: "other", name: "Find a cat", startTime: "19:40", startWeek: "2022-12-1",
endTime: "20:15", endWeek: "2023-2-2", day: [true, false, true, false, false, false, false], link: "https://link",
notes: "This is notes", location: "Sylvan"};
const event11 = {id: "2b3gwfa14", type: "assignment", name: "Honors Thesis", dueTime: "23:59", dueDate: "2022-12-17",
link: "https://link", class: "COMPSCI399T", compl: 60, difficult: 15, notes: "MyNotes"};
const event12 = {id: "2b3gwfa14", type: "assignment", name: "Learn React for Project", dueTime: "21:00", dueDate: "2022-12-12",
link: "https://link", class: "COMPSCI399T", compl: 10, difficult: 10, notes: "MyNotes"};



const AppComponent = () => {
    const eventsArr = [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12];
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