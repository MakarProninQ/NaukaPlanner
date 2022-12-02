import { useState } from "react";

const AddAssignmentElem = ({eventsObj, setEventsObj, popUp, setPopUp}) => {

  const [nameIn, setNameIn] = useState('');
  const [typeIn, setTypeIn] = useState('assignment');
  const [dueTimeIn, setDueTimeIn] = useState('');
  const [dueDateIn, setDueDateIn] = useState('');
  const [classIn, setClassIn] = useState('');
  const [completIn, setCompletIn] = useState(0);
  const [difficultIn, setDifficultIn] = useState(50);
  const [linkIn, setLinkIn] = useState('');
  const [notesIn, setNotesIn] = useState('');

  const nameChange = event => {setNameIn(event.target.value)};
  const typeChange = event => {setTypeIn(event.target.value)};
  const dueTimeChange = event => {setDueTimeIn(event.target.value)};
  const dueDateChange = event => {setDueDateIn(event.target.value)};
  const classChange = event => {setClassIn(event.target.value)};
  const completChange = event => {setCompletIn(event.target.value)};
  const difficultChange = event => {setDifficultIn(event.target.value)};
  const linkChange = event => {setLinkIn(event.target.value)};
  const notesChange = event => {setNotesIn(event.target.value)};


  const cancelButtonClicked = () => {
    setPopUp({show: false, type: null, eventId: null});
  }

  const saveButtonClicked = () => {
    //random should be removed
    const newEvent = {id: Math.random().toString(), name: nameIn, type: typeIn, dueTime: dueTimeIn, dueDate: dueDateIn, class: classIn, compl: parseInt(completIn),
    difficult: parseInt(difficultIn), link: linkIn, notes: notesIn};
    setEventsObj(eventsObj.addEvent(newEvent));
    setPopUp({show: false, type: null, eventId: null});
  }


  return (
    <div className="popup">
      <form className="my-form">
        <label className="form-label" htmlFor="name">Name<span className="asterisk-color">*</span>:</label>
        <input className="form-input" type="text" id="name" name="name" onChange={nameChange}/>

        <label className="form-label" htmlFor="event-type">Type<span className="asterisk-color" >*</span>:</label>
        <select className="event-dropdown" id="event-type" name="event-type" onChange={typeChange}>
          <option value="assignment">Assignment</option>
          <option value="class">Class</option>
          <option value="other">Other</option>
        </select>

        <label className="form-label" htmlFor="due-time"><span id="due-color">Due</span><span className="asterisk-color">*</span>:</label>
        <input className="form-input due-time" type="time" id="due-time" name="due-time" onChange={dueTimeChange}/>
        <input className="form-input due-date" type="date" id="due-date" name="due-date" onChange={dueDateChange}/>

        <label className="form-label" htmlFor="course-name">Class:</label>
        <input className="form-input" type="text" id="course-name" name="course-name" onChange={classChange}/>

        <label className="form-label" htmlFor="completion">Completion:</label>
        <input className="slider-completion" type="range" id="completion" name="completion" min="0" max="100" onChange={completChange}/>

        <label className="form-label" htmlFor="difficulty">Difficulty:</label>
        <input className="slider-difficulty" type="range" id="difficulty" name= "difficulty" min="0" max="100" onChange={difficultChange}/>

        <label className="form-label" htmlFor="hw-link">Link:</label>
        <input className="form-input" type="text" id="hw-link" name="hw-link" onChange={linkChange}/>

        <label className="form-label" htmlFor="notes">Notes:</label>
        <textarea className="form-input" name="notes" id="notes" maxLength="500" onChange={notesChange}></textarea>
      </form>
      <div className="button-list">
        <button className="button-class button1" onClick={cancelButtonClicked}>Cancel</button>
        <button className="button-class button3" name="save" id="save" onClick={saveButtonClicked}>SAVE</button>
      </div>
    </div>
  )
}

export default AddAssignmentElem;