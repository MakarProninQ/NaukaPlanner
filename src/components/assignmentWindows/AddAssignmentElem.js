import React, { Component } from 'react';
import CancelButton from './AssignmentCancelButton';

class AddAssignmentElem extends Component {
  render() {
    return (
      <div class="popup">
        <form class="my-form">
          <label class="form-label" for="name">Name<span class="asterisk-color">*</span>:</label>
          <input class="form-input" type="text" id="name" name="name"/>

          <label class="form-label" for="event-type">Type<span class="asterisk-color">*</span>:</label>
          <select class="event-dropdown" id="event-type" name="event-type">
            <option value="assignment">Assignment</option>
            <option value="class">Class</option>
            <option value="other">Other</option>
          </select>

          <label class="form-label" for="due-time"><span id="due-color">Due</span><span class="asterisk-color">*</span>:</label>
          <input class="form-input due-time" type="time" id="due-time" name="due-time" />
          <input class="form-input due-date" type="date" id="due-date" name="due-date" />

          <label class="form-label" for="course-name">Class:</label>
          <input class="form-input" type="text" id="course-name" name="course-name"/>

          <label class="form-label" for="completion">Completion:</label>
          <input class="slider-completion" type="range" id="completion" name="completion" min="0" max="100"/>

          <label class="form-label" for="difficulty">Difficulty:</label>
          <input class="slider-difficulty" type="range" id="difficulty" name= "difficulty" min="0" max="100" />

          <label class="form-label" for="hw-link">Link:</label>
          <input class="form-input" type="text" id="hw-link" name="hw-link" />

          <label class="form-label" for="notes">Notes:</label>
          <textarea class="form-input" name="notes" id="notes" maxlength="500"></textarea>
        </form>
        <div class="button-list">
          <CancelButton closeAssignF = {this.props.closeAssignF}></CancelButton>
          <button class="button-class button2" name="delete" id="delete">Delete</button>
          <button class="button-class button3" name="save" id="save">SAVE</button>
        </div>
      </div>
    )
  }
}

export default AddAssignmentElem;