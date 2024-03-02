const todoForm = document.querySelector("#todo_form");
const todoList = document.querySelector("#todo_list");
const todoInput = document.querySelector("#todo_form input");
const oneDayBtn = document.querySelector("#oneday_btn");
const sevenDayBtn = document.querySelector("#sevenday_btn");
const ONEDAYTODO_KEY = "onedaytodos";
const TODO_KEY = "todos";
const savedTodos = localStorage.getItem(ONEDAYTODO_KEY);
let todos = [];

todoForm.addEventListener("submit", todoSubmit);

function todoSubmit(event){
    event.preventDefault();
    const newTodo = onedaytodoInput.value;
    onedaytodoInput.value = "";
    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
    }
    onedaytodos.push(newTodoObj);
    showTodos(newTodoObj);
    saveTodos();
}

function showTodos(newTodo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    button.innerText = "x";
    button.addEventListener("click", deleteTodos);
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
}


let onedaytodos = []; 

function saveTodos(){
    if(oneDayBtn.classList.contains("active")){
        localStorage.setItem(ONEDAYTODO_KEY, JSON.stringify(onedaytodos));
    }else{
        alert("no");
    }
}



function deleteTodos(event){
    const li = event.target.parentElement;
    li.remove();
    ondaytodos = onedaytodos.filter(onedaytodos => onedaytodos.id !== parseInt(li.id));
    saveTodos();
}

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    onedaytodos = parsedTodos;
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
