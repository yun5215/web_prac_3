const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", resetInfo);

function resetInfo(){
    localStorage.clear();
    location.reload();
}

window.addEventListener("load", function(){
    document.body.style.visibility = "visible";
});