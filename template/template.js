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
    <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="showBigTask(${task['id']})" class="task" id="task${task['id']}">
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
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createAssignedTo(initials, colorId) {
    return `<div class="profileColor-${colorId}">${initials}</div>`
}


/**
 * This function is used to create amount of more users
 * @param {number} moreUsers - This is the amount you want to show
 * @returns HTML code
 */
function createAssignedToMoreUsers(moreUsers) {
    return `<div class="profileColorMoreUsers">+${moreUsers}</div>`
}



/**
 * This function is used to create big task
 * @param {array} task - This is the task you want to show
 * @returns HTML code
 */
function createBigTask(task) {
    return `
    <div class="bigTaskCancel"><img src="./img/icons-cancel.svg" onclick="closeBigTask()"></div>
    <div class="bigTaskEdit" onclick="showTaskEdit(${task['id']})"><img src="./img/pencil-white.svg"></div>
    <div>
        <div class="bigTaskDepartment ${task['department']}">${task['department']}</div>
    </div>
    <div class="bigTaskTitle">${task['title']}</div>
    <div class="bigTaskDescription">${task['description']}</div>
    <div class="bigTaskDate" id="bigTaskDate">
    </div>
    <div class="bigTaskPriority">
        <div class="bigTaskSubtitle">Priority:</div>
        <div class="bigTaskPriorityChild ${task['priority']}">
            <span>${task['priority']}</span>
            <img src="./img/prio-white-${task['priority']}.svg">
        </div>
    </div>
    <div class="bigTaskSubtask dNone" id="bigTaskSubtask${task['id']}"></div>
    <div class="bigTaskBottom">
        <div class="bigTaskSubtitle">Assigned To:</div>
        <div class="bigTaskAssignedTo" id="bigTaskAssignedTo${task['id']}">
        </div>
    </div>
`
}

/**
 * This function is used to create date on big task
 * @param {string} date - This is the date in german format you want to show 
 * @returns HTML code
 */
function createBigTaskDate(date) {
    return `<div class="bigTaskSubtitle">Due date:</div><div>${date}</div>`
}

/**
 * This function is used to create one assigned user
 * @param {string} name - This is the name of user
 * @param {string} initials - These are the initials of user
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createBigTaskAssignedTo(name, initials, colorId) {
    return `
    <div>
        <div class="bigTaskInitials profileColor-${colorId}">${initials}</div>
        <div>${name}</div>
    </div>
    `
}


/**
 * This function is used to create task editor
 * @param {array} task - This is the task you want to edit
 * @returns HTML code
 */
function createTaskEdit(task) {
    return `
    <div class="bigTaskCancel"><img src="./img/icons-cancel.svg" onclick="closeBigTask()"></div>
    <form onsubmit="saveTaskEdit(${task['id']}); return false;">
        <button class="bigTaskEditSubmit">
            <span>Ok</span>
            <img src="./img/icon-edit-ok.svg">
        </button>
        <label>
            Title
            <input type="text" required id="taskTitleEdit" value="${task['title']}">
        </label>
        <label>
            Description
            <textarea required id="taskDescriptionEdit">${task['description']}</textarea>
        </label>
        <label>
            Due date
            <input type="date" required id="taskDateEdit" value="${task['date']}">
        </label>
        <label>
            Prio
            <div class="taskEditPriority" id="taskEditPriority">
            </div>
        </label>
        <label>
            Assigned To
            <div class="taskEditContacts" id="taskEditContacts" onclick="openTaskContacts(${task['id']})"> 
                <span>Select contacts to assign</span>
                <img src="./img/icon-arrow-down.svg">
                <div class="taskContactsDropdown dNone" id="taskContactsDropdown" onclick="stopCloseContacts(event)"></div>
            </div>
            <div class="taskEditInitials" id="taskEditInitials"></div>
        </label>
    </form>
`
}


/**
 * This function is used to create priority on editor
 * @param {string} taskId - This is the Id of task you want to edit
 * @returns HTML code
 */
function createTaskEditPrio(taskId) {
    return `
        <div class="editPrio" id="urgentEditPrio" onclick="changePrio('urgent', ${taskId})">
            <span>urgent</span>
            <img src="./img/prio-urgent.svg" id="urgentEditPrioImg">
        </div>
        <div class="editPrio" id="mediumEditPrio"  onclick="changePrio('medium', ${taskId})">
            <span>medium</span>
            <img src="./img/prio-medium.svg" id="mediumEditPrioImg">
        </div>
        <div class="editPrio" id="lowEditPrio" onclick="changePrio('low', ${taskId})">
            <span>low</span> 
            <img src="./img/prio-low.svg" id="lowEditPrioImg">
        </div>
    
    `
}


/**
 * This function creates initials on task editor
 * @param {string} initials - These are the initials you want to show
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createTaskEditAssignedTo(initials, colorId) {
    return `<div class="profileColor-${colorId}">${initials}</div>`
}

// function createTaskContactsDropdown(name, n) {
//     return `
//         <label>
//             ${name}
//             <input type="checkbox" id="inputCheckbox${n}">
//         </label>`
// }
function createTaskContactsDropdown(name, n) {
    return `<label>
            ${name}
            <input ${isChecked(name) ? 'checked' : ''} type="checkbox" id="inputCheckbox${n}">
        </label>`

}

function isChecked(name) {
    return (contacts.find(c => name.includes(c.firstName) || name.includes(c.lastName)) !== -1);
}