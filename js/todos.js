const todoForm = document.querySelector("#todo_form");
const todoInput = document.querySelector("#todo_form input");
const oneDayBtn = document.querySelector("#oneday_btn");
const sevenDayBtn = document.querySelector("#sevenday_btn");
const ONEDAYTODO_KEY = "onedayTodos";
const TODO_KEY = "todos";
const savedTodos = localStorage.getItem(ONEDAYTODO_KEY);
let todos = [];
const oneDayList = document.querySelector("#oneday_list");
const sevenDayList = document.querySelector("#sevenday_list");

todoForm.addEventListener("submit", todoSubmit);

window.onload = function(){
    oneDayBtn.classList.add("active");
    todoInput.focus();
}


function todoSubmit(event){
    event.preventDefault();
    const newTodoObj = {
        text : todoInput.value,
        id : Date.now(),
    }
    if(oneDayBtn.classList.contains("active")){
        onedayTodos.push(newTodoObj);
        showTodos(newTodoObj, 1);
        
    }else if(sevenDayBtn.classList.contains("active")){
        sevendayTodos.push(newTodoObj);
        showTodos(newTodoObj, 7);
    }
    saveTodos();
    todoInput.value = "";
    // const newTodo = onedaytodoInput.value;
    // console.log(newTodo);
    // onedaytodoInput.value = "";
    // const newTodoObj = {
    //     text : newTodo,
    //     id : Date.now(),
    // }
    // onedayTodos.push(newTodoObj);
    // showTodos(newTodoObj);
    // saveTodos();
}

function showTodos(newTodo, i){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    button.innerText = "x";
    button.addEventListener("click", deleteTodos); 
    if(i == 1){
    oneDayList.appendChild(li);
    }else{
        sevenDayList.appendChild(li);
    }
    li.appendChild(span);
    li.appendChild(button);
}

let sevendayTodos = [];
let onedayTodos = []; 

function saveTodos(){
        localStorage.setItem(ONEDAYTODO_KEY, JSON.stringify(onedayTodos));
}



function deleteTodos(event){
    const li = event.target.parentElement;
    li.remove();
    onedayTodos = onedayTodos.filter(onedayTodos => onedayTodos.id !== parseInt(li.id));
    sevendayTodos = sevendayTodos.filter(sevendayTodos => sevendayTodos.id !== parseInt(li.id));
    saveTodos();
}

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    onedayTodos = parsedTodos;
    parsedTodos.forEach(showTodos);
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
