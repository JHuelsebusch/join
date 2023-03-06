let currentDraggedElement;

function initBoard() {
    renderBoard();
}

function renderBoard() {
    generateEmptyBoard();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        document.getElementById(`${task[`taskStatus`]}`).innerHTML += createTaskOnBoard(task);

        if(task['subtasks'].length>0){
            generateProgressBar(task);
        }
        generateAssignedTo(task);
    }
    generateOnDragTask(); // empty task layout for dragging
}

function generateEmptyBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}
function generateOnDragTask() {
    document.getElementById('toDo').innerHTML += createOnDragTask('toDo');
    document.getElementById('inProgress').innerHTML += createOnDragTask('inProgress');
    document.getElementById('awaitingFeedback').innerHTML += createOnDragTask('awaitingFeedback');
    document.getElementById('done').innerHTML += createOnDragTask('done');
}
function createOnDragTask(id) {
    return `<div class="onDrag dNone" id="onDragTask${id}"></div>`
}

function generateProgressBar(task){
    let amountSubtasks = task['subtasks'].length;
    let checkedSubtasks = task['subtasks'].filter(function(element){return element.subtaskDone == "checked";});
    let amountCheckedSubtasks = checkedSubtasks.length;
    let percentCheckedSubtasks = (amountCheckedSubtasks/amountSubtasks)*100;
    document.getElementById(`taskSubtask${task['id']}`).innerHTML += createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks)
    
}
function generateAssignedTo(task){
    let assignedTo = task['assignedTo'];
    document.getElementById(`taskAssignedTo${task['id']}`).innerHTML=``;
    if(assignedTo.length<4){
        for (let n = 0; n < assignedTo.length; n++) {
            let name = assignedTo[n];
            name = name.toLowerCase().split(' ');
            name = name.map(word => word.charAt(0).toUpperCase());
            name = name.join('');
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(name);
        }
    } else {
        for (let n = 0; n < 2; n++) {
            let name = assignedTo[n];
            name = name.toLowerCase().split(' ');
            name = name.map(word => word.charAt(0).toUpperCase());
            name = name.join('');
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(name);
        }
        let moreUsers=assignedTo.length-2
        document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedToMoreUsers(moreUsers);
    }
}
function createAssignedTo(name){
    return `<div class="green">${name}</div>`
}
function createAssignedToMoreUsers(moreUsers){
    return `<div class="green">+${moreUsers}</div>`
}

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
function createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks){
    return `<div class="subtaskProgressBar">
                <div class="innerProgressBar" style="width: ${percentCheckedSubtasks}%;"></div>
            </div>
            <span>${amountCheckedSubtasks}/${amountSubtasks} Done</span>
    `
}
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(`task${id}`).classList.add('draggedTask');
    console.log(currentDraggedElement);
    showDropCont();
}
function allowDrop(event) {
    event.preventDefault();
}
function moveTo(taskStatus) {
    tasks[currentDraggedElement]['taskStatus'] = taskStatus;
    renderBoard();
}
function showDropCont(){
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    // let newIds = taskIds.splice(n,1);
    for (let i = 0; i < taskIds.length; i++) {
        let id = taskIds[i];
        document.getElementById(`onDragTask${id}`).classList.remove('dNone');
}
}
function highlightDrop(n){
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    let newIds = taskIds.splice(n,1);
    for (let i = 0; i < newIds.length; i++) {
        let id = newIds[i];
        document.getElementById(`onDragTask${id}`).classList.remove('dNone');
    }
    
}