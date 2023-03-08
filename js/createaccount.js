/**
 * An array of user profiles.
 * @type {Object[]}
 */
const userProfile = [];

/**
 * The URL of the backend server.
 * @type {string}
 */
const backendUrl = 'https://gruppe-06i.developerakademie.net/smallest_backend_ever';

/**
 * Initializes the user profile array from the backend server.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    await downloadFromServer();
    const savedUserProfile = JSON.parse(backend.getItem('userProfile'));
    if (Array.isArray(savedUserProfile)) {
        userProfile.push(...savedUserProfile);
    }
}

/**
 * Creates a new user profile and saves it to the backend server.
 * @returns {void}
 */
function createNewUserProfile() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    /**
     * The new user profile.
     * @type {Object}
     * @property {string} name - The user's name.
     * @property {string} email - The user's email address.
     * @property {string} password - The user's password.
     */
    const newUserProfile = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    if (!isValidEmail(newUserProfile.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!isStrongPassword(newUserProfile.password)) {
        alert('Please enter a password that meets the complexity requirements.');
        return;
    }

    userProfile.push(newUserProfile);
    saveUserProfileToBackend();
    redirectToLoginPage();
}

/**
 * Saves the user profile array to the backend server.
 * @async
 * @returns {Promise<void>}
 */
async function saveUserProfileToBackend() {
    const response = await fetch(`${backendUrl}/userProfile`, {
        method: 'PUT',
        body: JSON.stringify(userProfile),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error(`Failed to save user profile data to server: ${response.status}`);
    }
}

/**
 * Redirects the user to the login page.
 * @returns {void}
 */
function redirectToLoginPage() {
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
}

/**
 * Checks if an email address is valid.
 * @param {string} email - The email address to validate.
 * @returns {boolean} Whether the email address is valid.
 */
function isValidEmail(email) {
    // TODO: Implement email validation
}

/**
 * Checks if a password is strong enough.
 * @param {string} password - The password to check.
 * @returns {boolean} Whether the password is strong enough.
 */
function isStrongPassword(password) {
    // TODO: Implement password strength check
}
