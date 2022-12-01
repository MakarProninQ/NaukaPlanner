import React, { Component } from 'react';
import '../../App.css'

class CancelButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.closeAssignF();
  }

  render() {
    return (
      <button class="button-class button1" onClick={this.handleClick}>Cancel</button>
    )
  }
}

export default CancelButton;