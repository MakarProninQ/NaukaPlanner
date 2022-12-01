import './App.css';
import MainPageElem from "./components/mainPage/MainPageElem";
import AddAssignmentElem from './components/assignmentWindows/AddAssignmentElem';
import React from 'react';

const regEvent = {id: "2b34", type: "class", name: "Learn React", startTime: "12:15", startDate: "2022-11-30",
endTime: "16:45", endDate: "2022-11-30"}; //id should match event id, such as classEvent.id

class App extends React.Component {
  constructor(props) {
    super(props);
    this.popup = [];
    this.state = {showdata : false};
    this.addAssignF = this.addAssignF.bind(this);
    this.closeAssignF = this.closeAssignF.bind(this);
  }

  addAssignF() {
    this.setState({showdata : true});
  }

  closeAssignF() {
    this.setState({showdata : false});
  }

  render() {
    return (
        <div className="app-container" id="app-container">
          <MainPageElem regEventsArr={[regEvent]} weekNum={0} addAssignF={this.addAssignF}/>
          {this.state.showdata && <AddAssignmentElem closeAssignF={this.closeAssignF}></AddAssignmentElem>}
        </div>
    );
  }
}

export default App;
