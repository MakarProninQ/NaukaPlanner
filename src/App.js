import './App.css';
import MainPageElem from "./components/mainPage/MainPageElem";

const regEvent = {id: "2b34", type: "class", name: "Learn React", startTime: "12:15", startDate: "2022-11-30",
endTime: "16:45", endDate: "2022-11-30"};

function App() {
  return (
      <div className="app-container">
        <MainPageElem regEventsArr={[regEvent]} weekNum={0}/>
      </div>
  );
}

export default App;