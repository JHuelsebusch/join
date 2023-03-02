function init() {
    generateNavbar();
}

function generateNavbar() {
    document.getElementById('navbar').innerHTML = getNavbarTemplate();
}