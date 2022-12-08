import * as eventsHelper from "../../eventsHelper";
import { useState } from "react";

const AddOtherElem = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

    const [nameIn, setNameIn] = useState('');
    const [typeIn, setTypeIn] = useState('other');
    const [startTimeIn, setStartTimeIn] = useState('');
    const [endTimeIn, setEndTimeIn] = useState('');
    const [dayIn, setDayIn] = useState([false, false, false, false, false, false, false]);
    const [startWeekIn, setStartWeekIn] = useState(50);
    const [endWeekIn, setEndWeekIn] = useState(50);
    const [locationIn, setLocationIn] = useState('');
    const [linkIn, setLinkIn] = useState('');
    const [notesIn, setNotesIn] = useState('');
  
    const nameChange = event => {setNameIn(event.target.value)};
    const typeChange = event => {
      setPopUp({show: true, type: `add-${event.target.value}`, eventId: null});
    };
    const startTimeChange = event => {setStartTimeIn(event.target.value)};
    const endTimeChange = event => {setEndTimeIn(event.target.value)};
    const startWeekChange = event => {setStartWeekIn(event.target.value)};
    const endWeekChange = event => {setEndWeekIn(event.target.value)};
    const locationChange = event => {setLocationIn(event.target.value)};
    const linkChange = event => {setLinkIn(event.target.value)};
    const notesChange = event => {setNotesIn(event.target.value)};
    const sunChange = event => {
        const days = dayIn;
        days[0] = event.target.checked;
        setDayIn(days);
    };
    const monChange = event => {
        const days = dayIn;
        days[1] = event.target.checked;
        setDayIn(days);
    };
    const tueChange = event => {
        const days = dayIn;
        days[2] = event.target.checked;
        setDayIn(days);
    };
    const wedChange = event => {
        const days = dayIn;
        days[3] = event.target.checked;
        setDayIn(days);
    };
    const thuChange = event => {
        const days = dayIn;
        days[4] = event.target.checked;
        setDayIn(days);
    };
    const friChange = event => {
        const days = dayIn;
        days[5] = event.target.checked;
        setDayIn(days);
    };
    const satChange = event => {
        const days = dayIn;
        days[6] = event.target.checked;
        setDayIn(days);
    };


    const cancelButtonClicked = () => {
      setPopUp({show: false, type: null, eventId: null});
    }
  
    const saveButtonClicked = () => {
      //id should be updated
        const newEvent  = {id: `${nameIn}-${Math.random()}`, type: typeIn, name: nameIn, startTime: startTimeIn, startWeek: startWeekIn,
            endTime: endTimeIn, endWeek: endWeekIn, day: dayIn, link: linkIn,
            notes: notesIn, location: locationIn};
        setEventsObj(eventsHelper.addEvent(eventsObj, newEvent));
        setPopUp({show: false, type: null, eventId: null});
    }
  
  
    return (
        <div className="popup">
            <form className="my-form">
                <label htmlFor="name" className="form-label">Name<span className="asterisk-color">*</span>: </label>
                <input className="form-input" type="text" id="name" name="name"  onChange={nameChange} required/>

                <label htmlFor="type" className="form-label">Type<span className="asterisk-color">*</span>: </label>
                <select className="event-dropdown" name="type" id="type" onChange={typeChange}>
                    <option value="other">Other</option>
                    <option value="assignment">Assignment</option>
                    <option value="class">Class</option>
                </select>

                <label  className="form-label" htmlFor="time"><span >Time<span className="asterisk-color">*</span>: </span> </label>
                <input className="form-input startdate" type="time" id="time" name="time" required onChange={startTimeChange}/>
                    <span id="timeDash">-</span>
                <input className="form-input enddate"type="time" id="time" name="time" required onChange={endTimeChange}/>

                <p id="day"> <span className="form-label">Day<span className="asterisk-color">*</span>:</span> 
                
                <input type="checkbox" id="sunday" name="sunday" onChange={sunChange}/>
                <label htmlFor="sunday" id="sundayT">S</label>
                
                <input type="checkbox" id="monday" name="monday" onChange={monChange}/>
                <label htmlFor="monday" id="mondayT">M</label>

                <input type="checkbox" id="tuesday" name="tuesday" onChange={tueChange}/>
                <label htmlFor="tuesday" id="tuesdayT">T</label>
                
                <input type="checkbox" id="wednesday" name="wednesday" onChange={wedChange}/>
                <label htmlFor="wednesday" id="wednesdayT">W</label>

                <input type="checkbox" id="thursday" name="thursday" onChange={thuChange}/>
                <label htmlFor="thursday" id="thursdayT">T</label>
                
                <input type="checkbox" id="friday" name="friday" onChange={friChange}/>
                <label htmlFor="friday" id="fridayT">F</label>

                <input type="checkbox" id="saturday" name="saturday" onChange={satChange}/>
                <label htmlFor="saturday" id="saturdayT">S</label>
                </p>
                <label className="form-label" htmlFor="weeks"> <span id="weekT">Weeks<span className="asterisk-color">*</span>:</span></label>
                <input className="form-input startdate" type="date" id="weeks" name="weeks" required onChange={startWeekChange}/>
                    <span id="weekDash">-</span> 
                <input className="form-input enddate" type="date" id="weeks" name="weeks" required onChange={endWeekChange}/>
                
                <label className="form-label" htmlFor="location">Location: </label>
                <input className="form-input" type="text" name="location" onChange={locationChange}/>

                <label className="form-label" htmlFor="link">Link: </label>
                <input className="form-input"type="text" name="link" onChange={linkChange}/>

                <label className="form-label" htmlFor="note">Notes: </label>
                <textarea className="form-input" id="notes" name="note" maxLength="500" onChange={notesChange}></textarea>

            </form>
            <div className="button-list">
                <button className="button-class button1" id="cancel" onClick={cancelButtonClicked}>Cancel</button>
                <button className="button-class button3" id="save" onClick={saveButtonClicked}>Save</button>
            </div>
        </div>
    );
};

/*
<div classNameName="popup">
        <form classNameName="my-form">
          <label classNameName="form-label" htmlhtmlFor="name">Name<span classNameName="asterisk-color">*</span>:</label>
          <input classNameName="form-input" type="text" id="name" name="name" onChange={nameChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="event-type">Type<span classNameName="asterisk-color" >*</span>:</label>
          <select classNameName="event-dropdown" id="event-type" name="event-type" onChange={typeChange}>
            <option value="assignment">Assignment</option>
            <option value="className">ClassName</option>
            <option value="other">Other</option>
          </select>
  
          <label classNameName="form-label" htmlhtmlFor="due-time"><span id="due-color">Due</span><span classNameName="asterisk-color">*</span>:</label>
          <input classNameName="form-input due-time" type="time" id="due-time" name="due-time" onChange={dueTimeChange}/>
          <input classNameName="form-input due-date" type="date" id="due-date" name="due-date" onChange={dueDateChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="course-name">ClassName:</label>
          <input classNameName="form-input" type="text" id="course-name" name="course-name" onChange={classNameChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="completion">Completion:</label>
          <input classNameName="slider-completion" type="range" id="completion" name="completion" min="0" max="100" onChange={completChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="difficulty">Difficulty:</label>
          <input classNameName="slider-difficulty" type="range" id="difficulty" name= "difficulty" min="0" max="100" onChange={difficultChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="hw-link">Link:</label>
          <input classNameName="form-input" type="text" id="hw-link" name="hw-link" onChange={linkChange}/>
  
          <label classNameName="form-label" htmlhtmlFor="notes">Notes:</label>
          <textarea classNameName="form-input" name="notes" id="notes" maxLength="500" onChange={notesChange}></textarea>
        </form>
        <div classNameName="button-list">
          <button classNameName="button-className button1" onClick={cancelButtonClicked}>Cancel</button>
          <button classNameName="button-className button3" name="save" id="save" onClick={saveButtonClicked}>SAVE</button>
        </div>
      </div>
*/
export default AddOtherElem;