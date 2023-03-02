/**
 * Startfunction
 */
function init() {
    generateNavbar();
}
/**
 * This function is used to generate side navbar and header
 */
function generateNavbar() {
    document.getElementById('navbar').innerHTML = getNavbarTemplate();
}
/**
 * This function is used to show menu after click on own profile picture
 */
function showProfileMenu() {
    let profileMenuClass = document.getElementById('profileMenu').classList;
    if (profileMenuClass.contains('dNone')) {
        profileMenuClass.remove('dNone');
    } else {
        profileMenuClass.add('dNone');
    }
}