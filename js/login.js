function showLoginForm() {
    document.getElementById("forgotpassword-container").classList.add("d-none");
    document.getElementById("signup-container").classList.add("d-none");
    document.getElementById("login-Box").classList.remove("d-none");
}

function showSignUpForm() {
    document.getElementById("forgotpassword-container").classList.add("d-none");
    document.getElementById("login-Box").classList.add("d-none");
    document.getElementById("signup-container").classList.remove("d-none");
}
/** this function  */
function showForgotPasswordForm() {
    document.getElementById("signup-container").classList.add("d-none");
    document.getElementById("login-Box").classList.add("d-none");
    document.getElementById("forgotpassword-container").classList.remove("d-none");
}





