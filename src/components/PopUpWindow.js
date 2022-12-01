import AddAssignmentElem from "../components/assignmentWindows/AddAssignmentElem";
import { useState } from "react";

const PopUpWindow = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

    if (!popUp.show){
        return;
    }
    if (popUp.type === "addAssignment"){
        return (
            <AddAssignmentElem></AddAssignmentElem>
        );
    }
    return ;
}

export default PopUpWindow;