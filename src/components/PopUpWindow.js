import AddAssignmentElem from "../components/assignmentWindows/AddAssignmentElem";
import AddOtherElem from "./otherWindows/AddOtherElem";
import AddClassElem from "./classWindows/AddClassElem";

const PopUpWindow = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

    if (!popUp.show){
        return;
    }
    if (popUp.type === "add-assignment"){
        return (
            <AddAssignmentElem eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp}/>
        );
    }
    if (popUp.type === "add-class"){
        return (
            <AddClassElem eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    if (popUp.type === "add-other"){
        return (
            <AddOtherElem eventsObj={eventsObj} setEventsObj={setEventsObj} popUp={popUp} setPopUp={setPopUp}/>
        )
    }
    return ;
}

export default PopUpWindow;