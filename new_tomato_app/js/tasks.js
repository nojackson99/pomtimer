// [X] todo: task allignment
// [] todo: use chrome storage to store tasks
// [X] todo: break into separate file?
// [] todo: create profiles with objects that track user name and tasks 
// -------------- TASK MODULE -----------------
export const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#new-task-input");
const taskList = document.querySelector("#tasks");

export function newTask(e) {
    e.preventDefault();

    const task = taskInput.value;
    taskInput.value = "";
    //const length = taskLength.value;
  
    if ( (!task) ) {
      alert("Please add a task and length before attempting to submit")

      return;
    }
  
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
  
    const taskElementContent = document.createElement("div");
    taskElementContent.classList.add("content");
  
    const taskElementInput = document.createElement("input");
    taskElementInput.type = ("text");
    taskElementInput.classList.add("text");
    taskElementInput.classList.add("task-input");
    taskElementInput.setAttribute("readonly", "readonly");
    taskElementInput.value = (task);
  
    const taskElementActions = document.createElement("div");
    taskElementActions.classList.add("actions");
  
    const taskElementEdit = document.createElement("button");
    taskElementEdit.classList.add("edit");
    taskElementEdit.classList.add("rounded-button");
    taskElementEdit.innerText = "Edit";
  
    const buttonSpan = document.createElement("span")
    buttonSpan.style = ("padding: 3px")
  
    const taskElementDelete = document.createElement("button");
    taskElementDelete.classList.add("delete");
    taskElementDelete.classList.add("rounded-button");
    taskElementDelete.innerText = "Delete";
  
    taskList.appendChild(taskElement);
    taskElement.appendChild(taskElementContent);
    taskElement.appendChild(taskElementActions);
    taskElementContent.appendChild(taskElementInput);
    taskElementContent.appendChild(document.createElement("span"));
    taskElementActions.appendChild(taskElementEdit);
    taskElementActions.appendChild(buttonSpan);
    taskElementActions.appendChild(taskElementDelete);
  
    taskElementEdit.addEventListener('click', () => {
      if(taskElementEdit.innerText.toLowerCase() == "edit") {
        taskElementInput.removeAttribute("readonly");
        taskElementInput.focus();
        taskElementEdit.innerText = "Save";
        taskElementEdit.style = ("padding: 1px");
      }
      else {
        taskElementInput.setAttribute("readonly", "readonly");
        taskElementEdit.innerText = "Edit";
        taskElementEdit.style = ("");
      }
    })
  
    taskElementDelete.addEventListener('click', ()=> {
      taskList.removeChild(taskElement);
    })
  
    return;
}