import * as eventsHelper from "../../eventsHelper";
import { useState } from "react";

const AddClassElem = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

    const [nameIn, setNameIn] = useState('');
    const [typeIn, setTypeIn] = useState('class');
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
                    <option value="class">Class</option>
                    <option value="assignment">Assignment</option>
                    <option value="other">Other</option>
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
export default AddClassElem;