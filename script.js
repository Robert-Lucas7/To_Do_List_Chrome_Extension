var tasks = [];
document.addEventListener('DOMContentLoaded', function(){
    loadTasks();
    document.getElementById("addTaskBtn").addEventListener("click",addTask);
    document.getElementById("completedTasksBtn").addEventListener("click",displayCompletedTasks);
    
});
function addTask(){
    let taskToAdd = document.getElementById("taskToAdd").value;
    document.getElementById("toDoContainer").appendChild(makeNewTask(tasks.length+1), taskToAdd);

    tasks.push(taskToAdd);
    // save task to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks(){
    let localTasks = JSON.parse(localStorage.getItem("tasks"));
    if(localTasks === null){
        tasks = [];
    } else{
        tasks = localTasks;
    }
    
    let container = document.getElementById("toDoContainer");
    for(let i=0;i<tasks.length;i++){
        container.appendChild(makeNewTask(i+1, tasks[i]));
    }
}

function handleCheckBoxChange(event){
    let checkBox = event.currentTarget;
    let number = checkBox.id.replace("checkBoxInput","");
    let textToStrike = document.getElementById(`taskP${number}`);
    if(checkBox.checked){
        textToStrike.style.textDecoration = "line-through";
    } else{
        textToStrike.style.removeProperty("text-decoration");
    }
    
}
/*Make element in the form:
<div id="taskDiv1" class="row">
    <div class="col-xs-6">
        <p>aisbdiausbd</p>
    </div>
    <div class="col-xs-4">
        <button id="infoBtn1" class="btn btn-success">Info</button>
    </div>
    <div class="col-xs-2">
        <input type="checkbox" name="checkedTask" checked>
    </div>
    
</div>
*/
function makeNewTask(number, taskMessage){
    let mainDiv = document.createElement("div");
    let textColDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let checkBoxDiv = document.createElement("div");

    let taskP = document.createElement("p");
    let infoBtn = document.createElement("button");
    let checkBox = document.createElement("input");

    mainDiv.id = `taskDiv${number}`;
    taskP.id = `taskP${number}`;
    infoBtn.id = `infoBtn${number}`;
    checkBox.id = `checkBoxInput${number}`;

    taskP.innerHTML = taskMessage;
    infoBtn.innerHTML = "Info";

    checkBox.type = "checkbox";
    checkBox.name = "checkedTask";
    checkBox.addEventListener("change", handleCheckBoxChange);

    infoBtn.className = "btn btn-success";
    mainDiv.className = "row";
    textColDiv.className = "col-xs-6";
    btnDiv.className = "col-xs-4";
    checkBoxDiv.className = "col-xs-2";

    textColDiv.appendChild(taskP);
    btnDiv.appendChild(infoBtn);
    checkBoxDiv.appendChild(checkBox);

    mainDiv.appendChild(textColDiv);
    mainDiv.appendChild(btnDiv);
    mainDiv.appendChild(checkBoxDiv);

    return mainDiv;
}

function displayCompletedTasks(){

}