import React from "react";

class AddEvent extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.props.addAssignF();
    }

    render() {
      return (
        <button id="add-event-button" onClick={this.handleClick}>+Add Event</button>
      )
    }
};

export default AddEvent;