let currentDraggedElement;


/**
 * Startfunction at board
 */
function initBoard() {
    renderBoard();
}


/**
 * This function renders all tasks on the board
 */
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
    generateBigTaskAssignedTo(task);
}


/**
 * This function is used to generate "assigned to"-section on big task 
 * @param {array} task - This is the task you want to show
 */
function generateBigTaskAssignedTo(task){
    let assignedTo = task['assignedTo'];
    for (let n = 0; n < assignedTo.length; n++) {
        let name = assignedTo[n];
        initials = generateInitials(name);
        document.getElementById(`bigTaskAssignedTo${task['id']}`).innerHTML+=createBigTaskAssignedTo(name, initials);
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