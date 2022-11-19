const mainContainer = document.getElementById("main-container");

const header = document.createElement("div");
header.id = "header";
mainContainer.appendChild(header);


const calendarContainer = document.createElement("div");
calendarContainer.id = "calendar-container";
for (let col = 0; col < 8; ++col){
    const dayColumn = document.createElement("div");
    dayColumn.classList.add("day-column");
    dayColumn.id = `day-col-${col}`;
    for (let row = 0; row < 25; ++row){
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

document.getElementById(`slot-0-0`).innerText = "MARCH\n2020";

document.getElementById("slot-0-1").innerHTML = `<span class="week-day">SUNDAY</span><br><span class="week-date">23</span>`;
document.getElementById("slot-0-2").innerHTML = `<span class="week-day">MONDAY</span><br><span class="week-date">24</span>`;
document.getElementById("slot-0-3").innerHTML = `<span class="week-day">TUESDAY</span><br><span class="week-date">25</span>`;
document.getElementById("slot-0-4").innerHTML = `<span class="week-day">WEDNESDAY</span><br><span class="week-date">26</span>`;
document.getElementById("slot-0-5").innerHTML = `<span class="week-day">THURSDAY</span><br><span class="week-date">27</span>`;
document.getElementById("slot-0-6").innerHTML = `<span class="week-day">FRIDAY</span><br><span class="week-date">28</span>`;
document.getElementById("slot-0-7").innerHTML = `<span class="week-day">SATURDAY</span><br><span class="week-date">29</span>`;

const highCurDay = document.createElement("div");
highCurDay.id = "highlight-cur-day";
document.getElementById("slot-0-3").appendChild(highCurDay);

document.getElementById("header").innerHTML = `
<span id="nauka-planner-name">Nauka Planner</span>
<button id="suggestions-button">Suggestions</button>
<button id="add-event-button">+Add Event</button>
`;