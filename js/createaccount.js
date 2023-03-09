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
 * The message box element.
 * @type {HTMLElement}
 */
const msgBox = document.getElementById("msgBox");

/**
 * Sends a POST request to the server to create a new user profile.
 * @param {Object} data - The user profile data.
 * @async
 * @returns {Promise<void>}
 */
async function createNewUserProfile() {
    try {
        // Get the values of the input fields
        const name = document.getElementById('inputName').value;
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        // Create an object with the user profile data
        const data = {
            name,
            email,
            password
        };

        // Send a POST request to the server to create the user profile
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${config.backendUrl}/userProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response was successful
        if (response.ok) {
            const msg = await response.text();
            msgBox.innerHTML = msg;
        } else {
            throw new Error(`Failed to create user profile: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * The form element.
 * @type {HTMLFormElement}
 */
const form = document.querySelector('form');

/**
 * Attach an event listener to the form's submit event to create a new user profile.
 */
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent the default form submission behavior

    createNewUserProfile(); // Call the createNewUserProfile function to create the user profile
});

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

// Show the message box if a message is provided in the URL parameters
if (msg) {
    msgBox.innerHTML = msg;
} else {
    msgBox.classList.add("dnone");
}
