setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');

async function initSummary() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    getLoggedUser();

}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUserName"));
}

function getLoggedUser() {
    let welcomePhrase = setWelcomePhrase();
    let currentUser = getCurrentUser();
    let welcome = document.getElementById('welcomeName');
    if (currentUser) {
        let user = currentUser[0];
        welcome.innerHTML = renderWelcome(user, welcomePhrase);

    } else {
        welcome.innerHTML = renderWelcomeGuest(welcomePhrase);
    }
}

function setWelcomePhrase() {
    let welcomePhrase
    let currentTime = new Date();;
    currentTime = currentTime.getHours();
    if (currentTime >= 0 && currentTime < 12) { welcomePhrase = 'Good morning' };
    if (currentTime >= 12 && currentTime < 18) { welcomePhrase = 'Good afternoon' };
    if (currentTime >= 18 && currentTime < 0) { welcomePhrase = 'Good evening' };
    return welcomePhrase;
}

function renderWelcomeGuest(welcomePhrase) {
    return `
        <span class="phrase">${welcomePhrase},</span>
        <span class="welcomeUsername">Guestuser</span>`;
}

function renderWelcome(user, welcomePhrase) {
    return `
        <span class="phrase">${welcomePhrase},</span>
        <span class="welcomeUsername">${user}</span>
        `;
}