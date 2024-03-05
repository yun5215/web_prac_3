const loginForm = document.querySelector("#login_form");
const loginInput = document.querySelector("#login_form input");
const welcome = document.querySelector("#welcome");
const welcomeUser = document.querySelector("#welcome h1:first-child");
const welcomeText = document.querySelector("#welcome h1:last-child");
const mainImage = document.querySelector("#mainimage");
const loginPage = document.querySelector("#login");
const mainPage = document.querySelector("#main");

const USERNAME_KEY = "username";
const HIDE_CLASSNAME = "hide";


const savedUsername = localStorage.getItem(USERNAME_KEY);



function loginSubmit(event){
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    const logoutBtn = document.querySelector("#logout");
    logoutBtn.classList.remove(HIDE_CLASSNAME);
    showWelcome(username);
}

function showWelcome(savedUsername){
    loginForm.classList.add(HIDE_CLASSNAME);
    mainImage.classList.add(HIDE_CLASSNAME);
    welcomeUser.innerText = `반가워요, ${savedUsername}님!`;
    welcomeText.innerText = `오늘의 메할일은 무엇이 있을까요?`;
    mainPage.classList.remove(HIDE_CLASSNAME);


}

if (savedUsername === null){
    loginPage.classList.remove(HIDE_CLASSNAME);
    loginForm.addEventListener("submit", loginSubmit);
} else{
    showWelcome(savedUsername);
    const logoutBtn = document.querySelector("#logout");
    logoutBtn.classList.remove(HIDE_CLASSNAME);
}


