let currentDraggedElement;

function renderBoard() {
    generateEmptyBoard();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        document.getElementById(`${task[`taskStatus`]}`).innerHTML += createTaskOnBoard(task);

        if(task['subtasks'].length>0){
            generateProgressBar(task);
        }

    }
}

function generateEmptyBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}
function generateProgressBar(task){
    let amountSubtasks = task['subtasks'].length;
    let checkedSubtasks = task['subtasks'].filter(function(element){return element.subtaskDone == "checked";});
    let amountCheckedSubtasks = checkedSubtasks.length;
    let percentCheckedSubtasks = (amountCheckedSubtasks/amountSubtasks)*100;
    document.getElementById(`taskSubtask${task['id']}`).innerHTML += createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks)
    
}

function createTaskOnBoard(task) {
    return `
    <div draggable="true" ondragstart="startDragging(${task['id']})" class="task">
        <div>
            <div class="taskDepartment ${task['department']}">${task['department']}</div>
        </div>
        <div class="taskTitle">${task['title']}</div>
        <div class="taskDescription">${task['description']}</div>
        <div class="taskSubtask" id="taskSubtask${task['id']}"></div>
        <div class="taskBottom">
            <div class="taskAssignedTo">
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
    console.log(currentDraggedElement);
}
function allowDrop(event) {
    event.preventDefault();
}
function moveTo(taskStatus) {
    tasks[currentDraggedElement]['taskStatus'] = taskStatus;
    renderBoard();
}