// -------------- tasks.js --------------------
// Holds code associated with creating, editing, and deleting tasks
// --------------------------------------------
// [X] todo: task allignment
// [] todo: use chrome storage to store tasks
// [X] todo: break into separate file?
// [X] todo: create profiles with objects that track user name and tasks 
// [X] todo: create functionality to set a current task that is displayed below timer
// [X] todo: add length display for each task that updates when a focus session has ended

import * as Data from './data.js';        //data asccoaited code
import * as MyTimer from './timer.js';    //timer associated code


// -------------- DOM NODES -------------------
const form = document.querySelector("#task-form");                      // new task submit form
export const taskInput = document.querySelector("#new-task-input");     // new task submit input box
export const taskLength = document.querySelector("#new-task-length");   // new task submit length box
export const taskList = document.querySelector("#tasks");               // div holding current tasks
export const tasksHeader = document.querySelector("#tasks-header");     // tasks title below task submit form


// creates new task when add task button is clicked in new task form
// creates all html elements with user provided content and appends to taskList
// creates event listeners for edit and delte buttons for the new task
// parameters are the values from the task submission form
export function displayTask(taskInputContent,taskLengthContent) {
    //placeholder to hold current sessions completed for task
    let taskProgress = 0;
  
    // form validation to ensure a task and length are entered before submitting
    // [X] todo: implement validation to prevent length being higher than 9
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
        // gets current task content to ensure proper task display
        taskElementInput.value = (`${taskInputContent}`);
        taskElementInput.removeAttribute("readonly");   // remove readonly to allow editting
        taskElementInput.focus();
        taskElementEdit.innerText = "Save";
        taskElementEdit.style = ("padding: 1px");
      }
      // [X] todo: implement if task is active update activeTask correctly
      // executes when edit button reads "Save"
      else {
        taskElementInput.setAttribute("readonly", "readonly");  // apply readonly to disallow editting
        taskElementEdit.innerText = "Edit";
        taskElementEdit.style = ("");

        // holds temporary task object to allow updating profilesArray data
        // [] todo: refactor to update this data without having to search profilesArray
        let tempTaskObject;

        // iterate through each element of tasksArray of activeProfile
        for (let i = 0; i < Data.activeProfile.tasksArray.length; i++) {
          // when taskInputContent equals correct task store in tempTaskObject
          if (taskInputContent === Data.activeProfile.tasksArray[i].description) {
            tempTaskObject = Data.activeProfile.tasksArray[i]
          }
        }

        // checks if a task has been selected as active
        if (!(MyTimer.activeTask.innerText === "Active task shown here")) {
          // updates active task display with new task after user is finsihed editing
          let newActiveTask = MyTimer.activeTask.innerText.slice(0,6);
          MyTimer.activeTask.innerText = `${newActiveTask}${taskElementInput.value}`;
        }       

        // gets new task description after user is done editing
        taskInputContent = taskElementInput.value;
        // update task content in tasksArray object
        tempTaskObject.description = taskElementInput.value;
        // update task display properly after user is finished editing
        taskElementInput.value = (`${taskProgress}/${taskLengthContent} | ${taskInputContent}`);
      }
    })
  
    // create event listener for newly created delete button
    taskElementDelete.addEventListener('click', ()=> {
      // deletes current task form profilesArray object
      Data.deleteTask(taskInputContent);
      // deletes task display and associated dom nodes
      taskList.removeChild(taskElement);
    })

    // clicking task box makes this task active
    taskElementInput.addEventListener('click', ()=> {
      // removes strikethrough css if it is applied to active task dom node
      if (MyTimer.activeTask.classList.contains("strikethrough")) {
          MyTimer.activeTask.classList.remove("strikethrough");
      }

     // displays cliked task as the active task 
     MyTimer.activeTask.innerText = `${taskProgress}/${taskLengthContent} | ${taskInputContent}`;
    })
}

// control adding new tasks, editing and deleting
form.addEventListener('submit', (e)=> {
  // prevent page refresh on submission of active task form
  e.preventDefault();

  // validation input to ensure there is an active profile before attempting to add task
  if(Data.activeProfile) {
    // call function to display task on site
    displayTask(taskInput.value,taskLength.value);

    // validation to ensure a task desc and length has been specified by user
    if ((taskLength.value) && (taskInput.value)) {
      Data.writeTaskToProfile(taskInput.value,taskLength.value);
    }
    
    // reset form input boxes to placeholder text
    taskInput.value = "";
    taskLength.value = "";
  }
  // alert user that profile needs to be created before submitting task
  else {
    alert("Please create a profile before attempting to submit a task.")
  }
  
});