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


/**
 * This function is used to create one task at board
 * @param {array} task - This is the task that you want to show 
 * @returns HTML code of one task
 */
function createTaskOnBoard(task) {
    return `
    <div draggable="true" ondragstart="startDragging(${task['id']})" class="task" id="task${task['id']}">
        <div>
            <div class="taskDepartment ${task['department']}">${task['department']}</div>
        </div>
        <div class="taskTitle">${task['title']}</div>
        <div class="taskDescription">${task['description']}</div>
        <div class="taskSubtask" id="taskSubtask${task['id']}"></div>
        <div class="taskBottom">
            <div class="taskAssignedTo" id="taskAssignedTo${task['id']}">
                <div class="green">JH</div>
            </div>
            <div class="taskPriority"><img src="./img/prio-${task['priority']}.svg" alt=""></div>
        </div>
    </div>
    `
}


/**
 * This function creates progress bar on task
 * @param {number} amountCheckedSubtasks - This is the amount of all checked subtasks
 * @param {number} amountSubtasks - This is the total amount of all subtasks
 * @param {number} percentCheckedSubtasks - This is the percentage of checked subtasks
 * @returns HTML code of progress bar
 */
function createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks) {
    return `<div class="subtaskProgressBar">
                <div class="innerProgressBar" style="width: ${percentCheckedSubtasks}%;"></div>
            </div>
            <span>${amountCheckedSubtasks}/${amountSubtasks} Done</span>
    `
}


/**
 * This function is used to create empty task container
 * @param {string} id - This is the task status, where the container should be build 
 * @returns HTML code of empty task container
 */
function createOnDragTask(id) {
    return `<div class="onDrag dNone" id="onDragTask${id}"></div>`
}


/**
 * This function creates initials on task
 * @param {string} initials - These are the initials you want to show
 * @returns HTML code
 */
function createAssignedTo(initials) {
    return `<div class="green">${initials}</div>`
}


/**
 * This function to used to create amount of more users
 * @param {number} moreUsers - This is the amount you want to show
 * @returns HTML code
 */
function createAssignedToMoreUsers(moreUsers) {
    return `<div class="green">+${moreUsers}</div>`
}