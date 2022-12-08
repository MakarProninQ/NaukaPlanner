document.getElementById("date-input").addEventListener("change", () => {console.log(document.getElementById("date-input").value)});
document.getElementById("time-input").addEventListener("change", () => {console.log(document.getElementById("time-input").value)});

console.log(new Date());

let arr = [1, 2, 3];
arr = arr.concat(4);
console.log(arr);
document.getElementById("checkbox-input").addEventListener("change", () => {console.log(document.getElementById("checkbox-input").checked)});