import './App.css';
import MainPageElem from "./components/mainPage/MainPageElem";
import AddAssignmentElem from './components/assignmentWindows/AddAssignmentElem';

const regEvent1 = {id: "2b34", type: "class", name: "Learn React", startTime: "15:15", startDate: "2022-12-1",
endTime: "12:45", endDate: "2022-12-2", progressBar: 0}; //id should match event id, such as classEvent.id
const regEvent2 = {id: "2b234", type: "deadline", name: "HHHHHHH HHHHHH HHHHHHHHH", startTime: "15:15", startDate: "2022-11-30",
endTime: "16:15", endDate: "2022-11-30", progressBar: 60};

function App() {
  return (
      <div className="app-container">
        <MainPageElem regEventsArrArg={[regEvent1, regEvent2]} weekNumArg={0}/>
      </div>
  );
}

export default App;
