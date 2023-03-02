/**
 * This function is used to generate side navbar and header
 * @returns HTML code of navbar and header
 */
function getNavbarTemplate() {
    return `
        <div class="sideMenu">
            <div class="logo">
                <img src="./img/logo-white.svg">
            </div>
            <div class="menu">
                <a href="summary.html"><img src="./img/icon-summary.svg" alt="">Summary</a>
                <a href="board.html"><img src="./img/Icon-board.svg" alt="">Board</a>
                <a href="add_task.html"><img src="./img/icon-add-task.svg" alt="">Add Task</a>
                <a href="contacts.html"><img src="./img/icon-contacts.svg" alt="">Contacts</a>
            </div>
            <div class="legal">
                <a href="impressum.html"><img src="./img/icon-legal.svg" alt="">Legal notice</a>

            </div>
        </div>
        <div class="header">
            <div class="mobileLogo"><img src=./img/join-logo.svg></div>
            <div class="subheadline">Kanban Project Management Tool</div>
            <div class="headerProfile">
                <a href="help.html"><img src="./img/icon-help-head.svg" alt=""></a>
                <div onclick="showProfileMenu()"><img src="./img/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash 1.png" alt=""></div>
            </div>
            <div class="profileMenu dNone" id="profileMenu">
                <div class="mobileProfileMenu">Help</div>
                <div class="mobileProfileMenu">Legal notice</div>
                <div>Log Out</div>
            </div>
        </div>`
}