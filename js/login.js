let currentUser = [];

setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    messageBox();
}

function messageBox() {
    let message = document.getElementById('msgBox');
    setInterval(function() { message.classList.add('fadeout') }, 2750);
    setTimeout(function() { message.classList.add('dnone') }, 3000);
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        saveLogin(user);
        window.location.href = `summary.html`;
    } else {
        shakeElement();
    }
}

function saveLogin(user) {
    let username = user.name;

    currentUser.push(username);
    loginToLocalStorage("username", username);
}

function loginToLocalStorage(key, currentUser) {
    localStorage.setItem(key, JSON.stringify(currentUser));
}

function guestLogin() {
    localStorage.clear();
    window.location.href = 'summary.html'
}

function shakeElement() {
    let mailShake = document.getElementById("emailShake");
    let passwwordShake = document.getElementById("passwordShake");
    mailShake.classList.add("shake");
    passwwordShake.classList.add("shake")
    setTimeout(function() {
        mailShake.classList.remove("shake");
        passwwordShake.classList.remove("shake");
    }, 1000);
}

function showPasswordIMG() {
    let img = document.getElementById("image");
    img.src = "assets/img/showPW.svg";
}

function showLockIMG() {
    let img = document.getElementById("image");
    img.src = "assets/img/password_input.svg";
}

function showPassword() {
    let show = document.getElementById('password');
    if (show.type == "password") {
        show.type = "text";
    } else {
        show.type = "password";
    }
}