/**
 * Configuration options for the application.
 * @typedef {Object} Config
 * @property {string} backendUrl - The URL of the backend server.
 */

/**
 * The configuration options for the application.
 * @type {Config}
 */
const config = {
    backendUrl: 'https://gruppe-06i.developerakademie.net/smallest_backend_ever',
};

/**
 * An array of user profiles retrieved from the backend server.
 * @type {Object[]}
 */
const userProfile = [];

/**
 * The email input field.
 * @type {HTMLInputElement}
 */
const email = document.getElementById('email');

/**
 * The password input field.
 * @type {HTMLInputElement}
 */
const password = document.getElementById('password');

/**
 * The message box element.
 * @type {HTMLElement}
 */
const msgBox = document.getElementById("msgBox");

/**
 * Initializes the user profile array from the backend server.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    try {
        const response = await fetch(`${config.backendUrl}/userProfile`);

        if (response.ok) {
            const userProfileJson = await response.json();
            userProfile.push(...userProfileJson);
        } else {
            throw new Error(`Failed to fetch user profile data from server: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Logs in a user if the provided email address and password match a user profile in the user profile array.
 * @returns {void}
 */
function login() {
    const user = userProfile.find(u => u.email === email.value && u.password === password.value);

    console.log(user);

    if (user) {
        console.log('User found');
    }
}

/**
 * The URL parameters for the current page.
 * @type {URLSearchParams}
 */
const urlParams = new URLSearchParams(window.location.search);

/**
 * The message parameter from the URL parameters.
 * @type {?string}
 */
const msg = urlParams.get('msg');

if (msg) {
    msgBox.innerHTML = msg;
} else {
    msgBox.classList.add("dnone");
}
