/**
 * Sets the backend URL.
 * @param {string} url - The URL of the backend server.
 * @returns {void}
 */
function setURL(url) {
    backendUrl = url;
}


/**
 * The URL of the backend server.
 * @type {string}
 */
let backendUrl = '';

// Set the backend URL
setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');


/**
 * Initializes the user profile array from the backend server.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    const response = await fetch(`${backendUrl}/userProfile`);

    if (response.ok) {
        /**
         * The user profile data in JSON format.
         * @type {Object[]}
         */
        const userProfileJson = await response.json();
        userProfile.push(...userProfileJson);
    } else {
        console.error(`Failed to fetch user profile data from server: ${response.status}`);
    }
}

/**
 * Logs in a user if the provided email address and password match a user profile in the user profile array.
 * @returns {void}
 */
function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = userProfile.find(u => u.email == email.value && u.password == password.value);

    console.log(user);

    if (user) {
        console.log('user gefunden');
    }
}

/**
 * The user profile array.
 * @type {Object[]}
 */
const userProfile = [];

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');

/**
 * The message box element.
 * @type {HTMLElement}
 */
let msgBox = document.getElementById("msgBox");

if (msg) {
    msgBox.innerHTML = msg;
} else {
    document.getElementById("msgBox").classList.add("dnone");
}
