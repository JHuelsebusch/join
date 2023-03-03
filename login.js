//* change center container to forgot password form

function showForgotPasswordForm() {
    document.getElementById("center-container").classList.add("d-none");
    document.getElementById("forgotpassword-container").classList.remove("d-none");
}

function showSignUpForm() {
    document.getElementById("center-container").classList.add("d-none");
    document.getElementById("signup-container").classList.remove("d-none");
}

function showLoginForm2() {
    document.getElementById("center-container").classList.remove("d-none");
    document.getElementById("forgotpassword-container").classList.add("d-none");
    document.getElementById("signup-container").classList.add("d-none");
}






