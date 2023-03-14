setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');
let currentDraggedElement;
let tasks = [];
let contacts = [];

/**
 * Startfunction at board
 */
async function initBoard() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];

    renderBoard();
}

/**
 * This function is used to save tasks on backend
 */
async function saveTask() {
    await backend.setItem('tasks', JSON.stringify(tasks));
    console.log("Task saved");
}

/**
 * This function renders all tasks on the board
 */
function renderBoard() {
    generateEmptyBoard();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        document.getElementById(`${task[`taskStatus`]}`).innerHTML += createTaskOnBoard(task);

        if(task['subtasks']){
            if(task['subtasks'].length>0){
            generateProgressBar(task);
        }
        }
        
        generateAssignedTo(task);
    }
    generateOnDragTask(); // empty task layout for dragging
}


/**
 * This function clear all tasks on the board
 */
function generateEmptyBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * This function creates empty task container 
 */
function generateOnDragTask() {
    document.getElementById('toDo').innerHTML += createOnDragTask('toDo');
    document.getElementById('inProgress').innerHTML += createOnDragTask('inProgress');
    document.getElementById('awaitingFeedback').innerHTML += createOnDragTask('awaitingFeedback');
    document.getElementById('done').innerHTML += createOnDragTask('done');
}


/**
 * This function is used to calculate parameters of progress bar
 * @param {array} task - This is the task that you want to show 
 */
function generateProgressBar(task){
    let amountSubtasks = task['subtasks'].length;
    let checkedSubtasks = task['subtasks'].filter(function(element){return element.subtaskDone == "checked";});
    let amountCheckedSubtasks = checkedSubtasks.length;
    let percentCheckedSubtasks = (amountCheckedSubtasks/amountSubtasks)*100;
    document.getElementById(`taskSubtask${task['id']}`).innerHTML += createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks)
    
}


/**
 * This function is used to generate shown users on task
 * @param {array} task - This is the task that you want to show 
 */
function generateAssignedTo(task){
    let assignedTo = task['assignedTo'];
    document.getElementById(`taskAssignedTo${task['id']}`).innerHTML=``;
    if(assignedTo.length<4){
        for (let n = 0; n < assignedTo.length; n++) {
            let name = assignedTo[n]['name'];
            let initials = generateInitials(name);
            let colorId = generateColorId(assignedTo[n]['id'])
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(initials, colorId);
        }
    } else {
        for (let n = 0; n < 2; n++) {
            let name = assignedTo[n]['name'];
            let initials = generateInitials(name);
            let colorId = generateColorId(assignedTo[n]['id'])
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(initials, colorId);
        }
        let moreUsers=assignedTo.length-2
        document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedToMoreUsers(moreUsers);
    }
}


/**
 * This function allowed the user to drag an element to other container
 * @param {number} id - This is the id of current dragged task 
 */
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(`task${id}`).classList.add('draggedTask')
    showDropCont();
}


/**
 * This function allowed the user to drop the dragged element in current space
 *
 * @param {event} event - This event allows user to drop element in current space
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function changes task status
 * @param {string} taskStatus - This is the new task status
 */
function moveTo(taskStatus) {
    tasks[currentDraggedElement]['taskStatus'] = taskStatus;
    saveTask();
    renderBoard();
}


/**
 * This function shows empty task container, where you can drop task
 */
function showDropCont(){
    let draggedTaskStatus = tasks[currentDraggedElement]['taskStatus'];
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    let taskIdPos = taskIds.indexOf(draggedTaskStatus);
    taskIds.splice(taskIdPos,1);
    for (let i = 0; i < taskIds.length; i++) {
        let id = taskIds[i];
        document.getElementById(`onDragTask${id}`).classList.remove('dNone');
    }
}


/**
 * This function shows only one empty task container
 * @param {number} n - This is the position, where container should be shown
 */
function highlightDrop(n){
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    if(tasks[currentDraggedElement]['taskStatus'] == taskIds[n]){
    } else {
        taskIds.splice(n,1);
        for (let i = 0; i < taskIds.length; i++) {
            let id = taskIds[i];
            document.getElementById(`onDragTask${id}`).classList.add('dNone');
        }
    }
}


/**
 * Ths function is used to show big task
 * @param {number} id - This is the Id of task you want to show
 */
function showBigTask(id){
    let task = tasks[id];
    document.getElementById('bigTaskBg').classList.remove('dNone');
    document.getElementById('bigTask').innerHTML = createBigTask(task);
    generateBigTaskDate(task['date']);
    generateBigTaskAssignedTo(task);
}


/**
 * This function is used to change date format from english to german
 * @param {string} date - This is the date in english format you want to show 
 */
function generateBigTaskDate(date){
    germanDate = date.split('-').reverse().join('.');
    document.getElementById('bigTaskDate').innerHTML = createBigTaskDate(germanDate);
}

/**
 * This function is used to generate "assigned to"-section on big task 
 * @param {array} task - This is the task you want to show
 */
function generateBigTaskAssignedTo(task){
    let assignedTo = task['assignedTo'];
    for (let n = 0; n < assignedTo.length; n++) {
        let name = assignedTo[n]['name'];
        let initials = generateInitials(name);
        let colorId = generateColorId(assignedTo[n]['id'])
        document.getElementById(`bigTaskAssignedTo${task['id']}`).innerHTML+=createBigTaskAssignedTo(name, initials, colorId);
    }
}


/**
 * This function is used to close big task
 */
function closeBigTask(){
    document.getElementById('bigTaskBg').classList.add('dNone');
}


/**
 * This function is used to cancel closing big task on clicking at task
 * @param {event} event 
 */
function doNotCloseBigTask(event){
    event.stopPropagation();
}


/**
 * This function is used to show task editor
 * @param {string} id - This is the id of task you want to edit
 */
function showTaskEdit(id){
    let task = tasks[id];
    document.getElementById('bigTask').innerHTML = createTaskEdit(task);
    generateTaskEditPrio(task, id);
    generateTaskEditAssignedTo(task);
}


/**
 * This function is used to generate priority section on editor
 * @param {array} task - This is the task you want to edit 
 * @param {string} id - This is the id of task you want to edit
 */
function generateTaskEditPrio(task, id){
    document.getElementById('taskEditPriority').innerHTML = createTaskEditPrio(id);
    document.getElementById(`${task['priority']}EditPrio`).classList.add(`editPrioActive`);
    document.getElementById(`${task['priority']}EditPrio`).classList.add(`${task['priority']}`);
    document.getElementById(`${task['priority']}EditPrioImg`).src = `./img/prio-white-${task['priority']}.svg`;
}


/**
 * This function is used to change task priority 
 * @param {*} newPrio - This is the new priority
 * @param {*} taskId - This is the id of task you want to change priority
 */
function changePrio(newPrio, taskId){
    let task = tasks[taskId];
    task['priority']=newPrio;
    generateTaskEditPrio(task, taskId);
    saveTask();
}

/**
 * This function is used to show assigned contacts on task editor
 * @param {array} task - This is the task you want to edit
 */
function generateTaskEditAssignedTo(task){
    let assignedTo = task['assignedTo'];
    for (let n = 0; n < assignedTo.length; n++) {
        let name = assignedTo[n]['name'];
        let initials = generateInitials(name);
        let colorId = generateColorId(assignedTo[n]['id'])
        document.getElementById(`taskEditInitials`).innerHTML+=createTaskEditAssignedTo(initials, colorId);
    }
}


/**
 * This function is used to open dropdown menu on task editor
 */
function openTaskContacts(taskId) {
    let TCClasslist = document.getElementById('taskContactsDropdown').classList;
    if (TCClasslist.contains('dNone')) {
        TCClasslist.remove('dNone');
        document.getElementById('taskEditContacts').classList.add('taskDropdown');
        showTaskEditContacts(taskId);
    } else {
        TCClasslist.add('dNone');
        document.getElementById('taskEditContacts').classList.remove('taskDropdown');
    }

}

/**
 * This function is used to save task changes
 * @param {string} taskId - This is the id of task you edited
 */
function saveTaskEdit(taskId){
    let task = tasks[taskId];
    let newTitle = document.getElementById('taskTitleEdit').value;
    let newDescription = document.getElementById('taskDescriptionEdit').value;
    let newDate = document.getElementById('taskDateEdit').value;
    task['title'] = newTitle;
    task['description'] = newDescription;
    task['date'] = newDate;

    saveTask();
    renderBoard();
    closeBigTask();
}

function showTaskEditContacts(taskId) {
    document.getElementById('taskContactsDropdown').innerHTML =``;
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById('taskContactsDropdown').innerHTML += createTaskContactsDropdown(name, c);
    }
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById(`inputCheckbox${c}`).checked = checkAssigned(taskId, name);
    }
}

function generateFullName(contact) {
    let name = [];
    name.push(contact['surname']);
    name.push(contact['name']);
    name = name.join(' ');
    return name;
}

function checkAssigned(taskId, name){
    let assignedTo = tasks[taskId]['assignedTo'];
    for (let index = 0; index < assignedTo.length; index++) {
        const assignedContact = assignedTo[index]['name'];
        if(assignedContact.includes(name) == true) {
            return true;
        }
    }
    return false;
}

function stopCloseContacts(e){
    e.stopPropagation();
}


// Add Task
let categories = ['design','media', 'backoffice','sales','marketing']
let newTask = [];
async function initAddTask() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
}
function openAddTaskCategory() {
    let ATCClasslist = document.getElementById('addTaskCategoryMenu').classList;
    if (ATCClasslist.contains('dNone')) {
        ATCClasslist.remove('dNone');
        document.getElementById('addTaskCategory').classList.add('taskDropdown');
        showAddTaskCategory();
    } else {
        ATCClasslist.add('dNone');
        document.getElementById('addTaskCategory').classList.remove('taskDropdown');
    }
}

function showAddTaskCategory() {
    document.getElementById('addTaskCategoryMenu').innerHTML =``;
    for (let c = 0; c < categories.length; c++) {
        let category = categories[c];
        document.getElementById('addTaskCategoryMenu').innerHTML += createTaskCategoryDropdown(category, c);
    }
}
function addCategory(catId){
    category=categories[catId];
    newTask['department']=category;
    generateSelectedCategory(category);
    openAddTaskCategory();
}
function generateSelectedCategory(category){
    document.getElementById('addTaskCategory').innerHTML = createSelectedCategory(category);
}

function changeAddTaskPrio(newPrio){
    newTask['priority']=newPrio;
    generateAddTaskPrio(newPrio);
}

function generateAddTaskPrio(newPrio){
    document.getElementById(`addTaskPrioSec`).innerHTML = createAddTaskPrio();
    document.getElementById(`${newPrio}AddTaskPrio`).classList.add(`addTaskPrioActive`);
    document.getElementById(`${newPrio}AddTaskPrio`).classList.add(`${newPrio}`);
    document.getElementById(`${newPrio}AddTaskPrioImg`).src = `./img/prio-white-${newPrio}.svg`;
}

function openAddTaskContacts() {
    let ATCClasslist = document.getElementById('addTaskContactsMenu').classList;
    if (ATCClasslist.contains('dNone')) {
        ATCClasslist.remove('dNone');
        document.getElementById('addTaskContacts').classList.add('taskDropdown');
        showAddTaskContacts();
    } else {
        ATCClasslist.add('dNone');
        document.getElementById('addTaskContacts').classList.remove('taskDropdown');
    }

}

function showAddTaskContacts() {
    document.getElementById('addTaskContactsMenu').innerHTML =``;
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById('addTaskContactsMenu').innerHTML += createTaskContactsDropdown(name, c);
    }
}
function changeAddTaskContacts(){
    let newTaskContacts = [];
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let contactId = contacts[c]['id'];
        let contactName = generateFullName(contact)
        let assignedTo = document.getElementById(`inputContacts${c}`)
        if(assignedTo.checked == true) {
            let data = {
                "id": contactId,
                "name": contactName,
            }
            newTaskContacts.push(data);
        }
    }
    newTask['assignedTo']=newTaskContacts;
}

function addTask() {
    pushValuesToNewTask();
    if(newTask['priority'] && newTask['department'] && newTask['assignedTo']){
        let data = {
            "assignedTo": newTask['assignedTo'],
            "id": newTask['id'],
            "title": newTask['title'],
            "description": newTask['description'],
            "date":newTask['date'],
            "priority": newTask['priority'],
            "department": newTask['department'],
            "taskStatus": 'toDo',
            'subtasks': newTask['subTasks'],
        }
        tasks.push(data);
        saveTask();   
    } else {
        console.log('Nicht möglich');
    }
    
}

function pushValuesToNewTask(){
    newTask['title'] = document.getElementById('addTaskTitle').value;
    newTask['description'] = document.getElementById('addTaskDescription').value;
    newTask['date'] = document.getElementById('addTaskDate').value;
    newTask['id']=tasks.length.toString();
}