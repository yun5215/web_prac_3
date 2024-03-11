const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_form input");
const oneDayBtn = document.querySelector("#oneday_btn");
const sevenDayBtn = document.querySelector("#sevenday_btn");
const ONEDAYTODO_KEY = "onedayTodos";
const SEVENDAYTODO_KEY = "sevendayTodos";
const savedTodos = localStorage.getItem(ONEDAYTODO_KEY);
const oneDayList = document.querySelector("#oneday_list");
const sevenDayList = document.querySelector("#sevenday_list");
let sevendayTodos = [];
let onedayTodos = []; 

todoForm.addEventListener("submit", todoSubmit);

window.onload = function(){
    init();
    oneDayBtn.classList.add("active");
    todoInput.focus();
}

function loadOnedayTodos() {
    const savedOnedayTodos = localStorage.getItem(ONEDAYTODO_KEY);
    if (savedOnedayTodos !== null) {
        onedayTodos = JSON.parse(savedOnedayTodos);
        onedayTodos.forEach(todo => showTodos(todo, 1));
    }
}

function loadSevendayTodos() {
    const savedSevendayTodos = localStorage.getItem(SEVENDAYTODO_KEY);
    if (savedSevendayTodos !== null) {
        sevendayTodos = JSON.parse(savedSevendayTodos);
        sevendayTodos.forEach(todo => showTodos(todo, 7));
    }
}

function todoSubmit(event){
    event.preventDefault();
    const newTodoObj = {
        text : todoInput.value,
        id : Date.now(),
    }
    if(oneDayBtn.classList.contains("active")){
        onedayTodos.push(newTodoObj);
        saveOnedayTodos();
        showTodos(newTodoObj, 1);
        
    }else if(sevenDayBtn.classList.contains("active")){
        sevendayTodos.push(newTodoObj);
        saveSevendayTodos();
        showTodos(newTodoObj, 7);
    }
    todoInput.value = "";
}


function showTodos(newTodo, i){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    button.innerText = "x";
    button.addEventListener("click", deleteTodos); 
    if(i == 1){
    const onedayUl = document.querySelector("#oneday_list ul");
    oneDayList.appendChild(li);
    onedayUl.appendChild(li);
    }else{
        const sevendayUl = document.querySelector("#sevenday_list ul");
        sevenDayList.appendChild(li);
        sevendayUl.appendChild(li);
    }
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
}



function saveOnedayTodos() {
    localStorage.setItem(ONEDAYTODO_KEY, JSON.stringify(onedayTodos));
}

function saveSevendayTodos() {
    localStorage.setItem(SEVENDAYTODO_KEY, JSON.stringify(sevendayTodos));
}



function deleteTodos(event){
    const li = event.target.parentElement;
    li.remove();
    const todoId = parseInt(li.id);
    onedayTodos = onedayTodos.filter(todo => todo.id !== todoId);
    saveOnedayTodos();
    sevendayTodos = sevendayTodos.filter(todo => todo.id !== todoId);
    saveSevendayTodos();
}

function init() {
    loadOnedayTodos();
    loadSevendayTodos();
}

oneDayBtn.addEventListener("click", function() {
    oneDayBtn.classList.add("active");
    sevenDayBtn.classList.remove("active");
    todoForm.style.display = "block";
    todoInput.focus();
});

sevenDayBtn.addEventListener("click", function() {
    sevenDayBtn.classList.add("active");
    oneDayBtn.classList.remove("active");
    todoForm.style.display = "block";
    todoInput.focus();
});


todoInput.addEventListener("focus", function() {
    if (oneDayBtn.classList.contains("active")) {
        oneDayBtn.classList.add("focus");
    } else if (sevenDayBtn.classList.contains("active")) {
        sevenDayBtn.classList.add("focus");
    }
});

todoInput.addEventListener("blur", function() {
    oneDayBtn.classList.remove("focus");
    sevenDayBtn.classList.remove("focus");
});
