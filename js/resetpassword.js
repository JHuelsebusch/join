setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function resetPassword() {
    let newPassword = document.getElementById('newPassword');
    let confirmPassword = document.getElementById('confirmPassword');
    let email = getEmailURLParameter();

    let user = users.find(u => u.email === email);
    if (user.email === email) {
        if (newPassword.value === confirmPassword.value) {
            user.password = newPassword.value;
            await backend.setItem('users', JSON.stringify(users));
            console.log('Password reset successful!');
            //BESTÄTIGUNGSANIMATION
            setTimeout(function() { window.location.href = '/join/index.html' }, 3000);
        } else {
            console.log('Passwords do not match');
            newPassword.value = '';
            confirmPassword.value = '';
        }
    }
}

function getEmailURLParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}