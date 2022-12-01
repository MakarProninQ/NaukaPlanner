import AddEvent from "./AddEventButton";

const Header = ({addAssignF}) => {
    return (
        <div id="header">
            <span id="nauka-planner-name">Nauka Planner</span>
            <button id="suggestions-button">Suggestions</button>
            <AddEvent addAssignF={addAssignF}></AddEvent>
        </div>
    )
};

export default Header;