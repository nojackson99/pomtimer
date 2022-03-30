// -------------- tasks.js --------------------
// Holds code associated with creating, editing, and deleting tasks
// --------------------------------------------
// [X] todo: task allignment
// [] todo: use chrome storage to store tasks
// [X] todo: break into separate file?
// [] todo: create profiles with objects that track user name and tasks 
// [] todo: create functionality to set a current task that is displayed below timer
// [] todo: add length display for each task that updates when a focus session has ended

import * as MyTimer from './timer.js';    //timer associated code
import * as Data from './data.js';


// -------------- Variables -------------------
const form = document.querySelector("#task-form");        // new task submit form
export const taskInput = document.querySelector("#new-task-input");     // new task submit input box
export const taskLength = document.querySelector("#new-task-length");   // new task submit length box
const taskList = document.querySelector("#tasks");               // div holding current tasks
export const tasksHeader = document.querySelector("#tasks-header");

// creates new task when add task button is clicked in new task form
// creates all html elements with user provided content and appends to taskList
// creates event listeners for edit and delte buttons for the new task
function displayTask(e) {
    // prevents Add Task button from refreshing the page

    //placeholder to allow  changing later
    let taskProgress = 0;

    // capture user input for new task and task length
    let taskInputContent = taskInput.value;
    const taskLengthContent = taskLength.value;
  
    // form validation to ensure a task and length are entered before submitting
    if ( (!taskInputContent) || (!taskLengthContent) ) {
      alert("Please add a task and length before attempting to submit");

      return;
    }



    // creating all html elements, classes, and content necessary to display a new task
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
  
    const taskElementContent = document.createElement("div");
    taskElementContent.classList.add("content");
  
    const taskElementInput = document.createElement("input");
    taskElementInput.type = ("text");
    taskElementInput.classList.add("text");
    taskElementInput.classList.add("task-input");
    taskElementInput.setAttribute("readonly", "readonly");  // ensure new task can't be edited without first clicking edit button
    taskElementInput.value = (`${taskProgress}/${taskLengthContent} | ${taskInputContent}`);
  
    const taskElementActions = document.createElement("div");
    taskElementActions.classList.add("actions");
  
    const taskElementEdit = document.createElement("button");
    taskElementEdit.classList.add("edit");
    taskElementEdit.classList.add("rounded-button");
    taskElementEdit.innerText = "Edit";
  
    const buttonSpan = document.createElement("span");
    buttonSpan.style = ("padding: 3px");
  
    const taskElementDelete = document.createElement("button");
    taskElementDelete.classList.add("delete");
    taskElementDelete.classList.add("rounded-button");
    taskElementDelete.innerText = "Delete";
  
    // appending created elements properly to display a new task in list
    taskList.appendChild(taskElement);
    taskElement.appendChild(taskElementContent);
    taskElement.appendChild(taskElementActions);
    taskElementContent.appendChild(taskElementInput);
    taskElementContent.appendChild(document.createElement("span"));
    taskElementActions.appendChild(taskElementEdit);
    taskElementActions.appendChild(buttonSpan);
    taskElementActions.appendChild(taskElementDelete);
  
    // create event listener for newly created edit button
    taskElementEdit.addEventListener('click', () => {
      if(taskElementEdit.innerText.toLowerCase() == "edit") {
        taskElementInput.value = (`${taskInputContent}`);
        taskElementInput.removeAttribute("readonly");
        taskElementInput.focus();
        taskElementEdit.innerText = "Save";
        taskElementEdit.style = ("padding: 1px");
      }
      else {
        taskElementInput.setAttribute("readonly", "readonly");
        taskElementEdit.innerText = "Edit";
        taskElementEdit.style = ("");
        taskInputContent = taskElementInput.value
        taskElementInput.value = (`${taskProgress}/${taskLengthContent} | ${taskInputContent}`);
      }
    })
  
    // create event listener for newly created delete button
    taskElementDelete.addEventListener('click', ()=> {
      taskList.removeChild(taskElement);
    })

    // clicking task box makes this task active
    taskElementInput.addEventListener('click', ()=> {
     MyTimer.activeTask.innerText = `${taskProgress}/${taskLengthContent} | ${taskInputContent}`;
    })
}


// control adding new tasks, editing and deleting
form.addEventListener('submit', (e)=> {
  e.preventDefault();

  if(Data.activeProfile) {
    displayTask();
    Data.writeTaskToProfile();
  }
  else {
    alert("Please create a profile before attempting to submit a task.")
  }
  
});