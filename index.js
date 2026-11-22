const btn = document.getElementById("btnTheme");
const intro = document.getElementById("intro");
const interesi = document.getElementById("interesi");
const Uchastie = document.getElementById("Uchastie");
let textBox = document.getElementById("txt");
const btnAdd = document.getElementById("btnAdd");
let planove = document.getElementsByClassName("Planove");
const btnFilter = document.getElementsByClassName("filter-btn");
const btnActive = document.getElementById("btnActive");
const btnDone = document.getElementById("btnDone");
const btnAll = document.getElementById("btnAll");
const progressBar = document.getElementById("bar");
const progress = document.getElementById("progress");
const infoBar = document.getElementById("infoBar");
document.addEventListener("DOMContentLoaded",() => {
    let savedT = localStorage.getItem("Theme")
if (savedT === "Light") {
        
        LightMode();
    } else {
        
        DarkMode();
    }
});

btn.onclick = function() {
switchTheme()
}
let count = 0;
function switchTheme() {
    count++;
    if (count % 2 == 1) {
        LightMode()
        localStorage.setItem("Theme", "Light");
    }
    else{
        DarkMode()
        localStorage.setItem("Theme", "Dark");
    }
}

function LightMode(){
    btn.style.backgroundColor = "#bf9d7a";
    btn.style.color = "black";
    btn.textContent = "Тъмно";
    intro.style.backgroundColor = "#80Add7";
    interesi.style.backgroundColor = "#80Add7";
    Uchastie.style.backgroundColor = "#80Add7";
    btnAdd.style.backgroundColor = "#80Add7";
    btnActive.style.backgroundColor = "#0abda0";
    btnDone.style.backgroundColor = "#0abda0";
    btnAll.style.backgroundColor = "#0abda0";
    progress.style.backgroundColor = "cadetblue";
    progressBar.style.backgroundColor = "aquamarine";
    document.body.style.backgroundColor = "#ebf2ea";
    count = 1;
}

function DarkMode()
{
    btn.style.backgroundColor = "#bf9d7a";
    btn.style.color = "white";
    btn.textContent = "Светло";
    intro.style.backgroundColor = "#a15c38";
    interesi.style.backgroundColor = "#a15c38";
    Uchastie.style.backgroundColor = "#a15c38";
    btnAdd.style.backgroundColor = "#a15c38";
    btnActive.style.backgroundColor = "#e27f0e";
    btnDone.style.backgroundColor = "#e27f0e";
    btnAll.style.backgroundColor = "#e27f0e";
     progress.style.backgroundColor = "rgb(255, 157, 28)";
    progressBar.style.backgroundColor = "rgb(226, 128, 0)";
    document.body.style.backgroundColor = "#423a36";
    count = 0;
}
btnAdd.onclick = function() {
Add()
}

let goals = [];

let goalsBefore = [{text: "Да науча SQL", completed: false},
    {text: "Да правя по-хубави дизайни на уебстраници", completed: false},
    {text: "Да създам добре функциониращ сайт", completed: false}
];
const STORAGE_KEY = "Goals";
document.addEventListener("DOMContentLoaded", () =>{
const addedGoals = localStorage.getItem("Goals");
if (addedGoals) {
        const parsed = JSON.parse(addedGoals);
        if (parsed.length > 0) {
            goals = parsed;
        } else {
            goals = goalsBefore;
            SaveGoal();
        }
    } else {
        goals = goalsBefore;
        SaveGoal();
    }
    GoalsShow()
});

function SaveGoal()
{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(goals))
}


let currentFilter = 'all'

function Add(){
    let text = textBox.value.trim();

    if (text === "") {
        alert("Моля, въведете цел!");
        return;
    }
    let isDuplicate = goals.some(g => g.text.trim().toLowerCase() == text.toLowerCase());
    if (isDuplicate) {
        alert("Тази цел вече съществува в списъка!");
        return;
    }
    goals.push({text: text,completed: false});
    textBox.value = "";
    saveToStorage()
    GoalsShow()
}
function GoalsShow(){
    goalsList.innerHTML = "";

    let filteredGoals = goals.filter(g => {
        if (currentFilter === 'active') return !g.completed;     
        if (currentFilter === 'done') return g.completed; 
        return true;
    });
    filteredGoals.forEach((goal) => {

        let originalIndex = goals.indexOf(goal);

        const plan = document.createElement("li");
        plan.style.listStyle = "none";
        goalsList.append(plan);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;
        checkbox.onclick = () => toggleGoal(originalIndex);

        const textSpan = document.createElement("span");
        textSpan.textContent = goal.text;
        if (goal.completed) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = "gray";
            UpdateBar()
        }
        const btnDelete = document.createElement("button")
        btnDelete.textContent = "Изтрий"
        btnDelete.style.backgroundColor = "#bf9d7a";
        btnDelete.style.border = "none";
        btnDelete.style.borderRadius = "20px";
        btnDelete.onclick = function(){
            let isConfirmed = confirm("Сигурни ли сте, че искате да изтриете тази цел?");
            if (isConfirmed) {
                goals.splice(originalIndex, 1);
                saveToStorage();
                UpdateBar();
                GoalsShow();
            }
            
        }
        UpdateBar()
        plan.appendChild(checkbox);
        plan.appendChild(textSpan);
        plan.appendChild(btnDelete);
        goalsList.append(plan);
    });

}
function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;
    saveToStorage();
    GoalsShow();
}
btnAll.onclick = function (){
    ShowAll();
}
function ShowAll(){
    currentFilter = "all";
    GoalsShow();
}
btnActive.onclick = function(){
    ShowActive();
}
function ShowActive(){
    currentFilter = 'active';
    GoalsShow();
    console.log("active");
}
btnDone.onclick = function(){
    ShowDone();
}
function ShowDone(){
    currentFilter = "done";
    GoalsShow();
    console.log("done");
}
function saveToStorage() {
    localStorage.setItem("Goals", JSON.stringify(goals));
}
document.addEventListener("DOMContentLoaded", () => {
    let storedGoals = localStorage.getItem("Goals");
    
    if (storedGoals) {
        goals = JSON.parse(storedGoals);
    } else {
        goals = [];
    }
    GoalsShow();
});
function UpdateBar(){
    const total = goals.length;
    const completed = goals.filter(goal => goal.completed == true).length;
    let percent = 0;
    if (total == 0) {
        percent = 0;
    }
    else{
        percent = Math.round(completed / total * 100);
    }
    if (completed/total == 1) {
        progressBar.style.width = `${97.5}%`;
    }
    else{
        progressBar.style.width = `${percent}%`;
    }
    infoBar.textContent = `Общо цели: ${total} | Завършени: ${completed} | Процент: ${percent}%`;
}