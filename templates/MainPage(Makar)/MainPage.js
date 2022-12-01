const mainContainer = document.getElementById("main-container");

const header = document.createElement("div");
header.id = "header";
mainContainer.appendChild(header);


const calendarContainer = document.createElement("div");
calendarContainer.id = "calendar-container";
for (let col = 7; col >= 0; --col){
    const dayColumn = document.createElement("div");
    dayColumn.classList.add("column-grid");
    if (col != 0){
        dayColumn.classList.add("day-col");
    }
    dayColumn.id = `day-col-${col}`;
    for (let row = 24; row >= 0; --row){
        const timeSlot = document.createElement('div');
        timeSlot.classList.add("time-slot", `row-${row}`, `col-${col}`);
        timeSlot.id = `slot-${row}-${col}`; 
        dayColumn.append(timeSlot);
    }
    calendarContainer.appendChild(dayColumn);
}

mainContainer.appendChild(calendarContainer);

for (let row = 1; row < 25; ++row){
    const hour = document.getElementById(`slot-${row}-0`);
    let text;
    if ((row + 7) % 12 == 0){
        text = "12 ";
    }
    else{
        text = `${(row + 7) % 12} `;
    }
    if ((row + 7) % 24 < 12){ 
        text += "am";
    }
    else {
        text += "pm";
    }
    hour.innerText = text;
}

document.getElementById(`slot-0-0`).innerText = "FEB.\n2020";

document.getElementById("slot-0-1").innerHTML = `<div class="week-day">SUNDAY</div><div class="week-date">23</div>`;
document.getElementById("slot-0-2").innerHTML = `<div class="week-day">MONDAY</div><div class="week-date">24</div>`;
document.getElementById("slot-0-3").innerHTML = `<div class="week-day">TUESDAY</div><div class="week-date">25</div>`;
document.getElementById("slot-0-4").innerHTML = `<div class="week-day">WEDNESDAY</div><div class="week-date">26</div>`;
document.getElementById("slot-0-5").innerHTML = `<div class="week-day">THURSDAY</div><div class="week-date">27</div>`;
document.getElementById("slot-0-6").innerHTML = `<div class="week-day">FRIDAY</div><div class="week-date">28</div>`;
document.getElementById("slot-0-7").innerHTML = `<div class="week-day">SATURDAY</div><div class="week-date">29</div>`;

const highCurDay = document.createElement("div");
highCurDay.id = "highlight-cur-day";
document.getElementById("slot-0-3").appendChild(highCurDay);

document.getElementById("header").innerHTML = `
<span id="nauka-planner-name">Nauka Planner</span>
<button id="suggestions-button">Suggestions</button>
<button id="add-event-button">+Add Event</button>
`;

let eventTimeStart0 = (2, 12, 15);
let eventName0 = "CS311";
let eventTimeEnd0 = (2, 15, 55);

const startEvent0 = document.createElement("div");
startEvent0.id = "event-start-0";
startEvent0.classList.add("class-event", "event-start");
startEvent0.style = `top: ${15/60*100}%; height: ${75}%`;
document.getElementById(`slot-${12-7}-${2 + 1}`).appendChild(startEvent0);


for (let i = 1; i <= 3; ++i) {
    const middleEvent0 = document.createElement("div");
    middleEvent0.classList.add("class-event", "event-middle", "event-middle-0");
    middleEvent0.style = `
        height: 100%;
    `;
    document.getElementById(`slot-${12-7+i}-${2+1}`).appendChild(middleEvent0);
}

const endEvent0 = document.createElement("div");
endEvent0.id = "event-end-0";
endEvent0.classList.add("class-event", "event-end");
endEvent0.style = `height: ${55/60*100}%`;
document.getElementById(`slot-${12-7+4}-${2 + 1}`).appendChild(endEvent0);

const divToContainText = document.createElement("div");
divToContainText.id = "event-text-0";
divToContainText.classList.add("event-text");
divToContainText.style = `bottom: ${150-35/60*100}%`;
divToContainText.innerText = `Learn React\n12:15pm-4:55pm`;


document.getElementById(`slot-${12-7+2}-${2+1}`).appendChild(divToContainText);

const arrowRightDiv = document.createElement("div");
arrowRightDiv.id = "arrow-right";
document.getElementById("calendar-container").appendChild(arrowRightDiv);

const arrowLeftDiv = document.createElement("div");
arrowLeftDiv.id = "arrow-left";
document.getElementById("calendar-container").appendChild(arrowLeftDiv);
