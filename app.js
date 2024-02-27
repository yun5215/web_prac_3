const loginForm = document.querySelector("#login_form");
const loginInput = document.querySelector("#login_form input");
const welcome = document.querySelector("#welcome");
const USERNAME_KEY = "username";


loginForm.addEventListener("submit", loginSubmit);

function loginSubmit(event){
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    showWelcome(username);
}

function showWelcome(username){
    welcome.innerText = `어서오세요, ${username}, 님!`;
}
