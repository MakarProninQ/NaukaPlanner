import * as eventsHelper from "../../eventsHelper";

const Header = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

    const addEventClicked = () => {
        setPopUp({show: true, type: "addAssignment", eventId: null});
    };

    const suggestionsClicked = () => {
        setEventsObj(eventsHelper.toggleSugg(eventsObj));
    }

    return (
        <div id="header">
            <span id="nauka-planner-name">Nauka Planner</span>
            <button id="suggestions-button" onClick={suggestionsClicked}>Suggestions</button>
            <button id="add-event-button" onClick={addEventClicked}>+Add Event</button>
        </div>
    )
};

export default Header;