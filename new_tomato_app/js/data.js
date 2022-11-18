//----------------------------------------------------data.js------------------------------------------------------
// The code in this file controls most data operations for the app. Contains functions to create new profiles
// and tasks. Also has functions to delete tasks and update active profile.
//-----------------------------------------------------------------------------------------------------------------

import * as Header from './header.js';
import * as Tasks from './tasks.js';
import * as MyTimer from './timer.js';

// -------------- VARIABLES -------------------
export const profilesArray = []; // array to hold all profile objects
let nextProfileID = 0; // tracks available id for profile instantiation
export let activeProfile = null; // holds the current activeProfile as an object

export function newProfileSubmit(fName, lName, uName) {
  // close profile modal on successful submission of form
  Header.profileModal.close();

  // get and increment nextProfileID to set as ID for new profile object
  const myid = nextProfileID;
  nextProfileID++;

  // push a new profile object to profilesArray
  profilesArray.push({
    id: myid, // id of profile object
    nextTaskID: 0, // holds next avilable task id for task instantiaton
    firstName: fName, // first name of user
    lastName: lName, // last name of user
    username: uName, // username of user
    tasksArray: [], // hold array of tasks for current user
  });

  // set profile to active
  setActiveProfile(uName);
  // clears tasks display
  clearTaskDisplay();

  // add new profile html element to profile menu
  let profileMenuElement = document.createElement('p');
  profileMenuElement.innerText = `${uName}`;
  Header.dropdownContent.appendChild(profileMenuElement);

  // set event listener to update activeProfile when profile is clicked in menu
  profileMenuElement.addEventListener('click', (e) => {
    setActiveProfile(e.currentTarget.innerText);
    //clear task display then update with new user's tasks
    clearTaskDisplay();
    writeNewTaskDisplay();
  });
}

// writes task submitted through new task form to activeProfile.taskArray
export function writeTaskToProfile(taskInput, taskLength) {
  // pushes a new task object to tasksArray
  // [] todo: add task id
  activeProfile.tasksArray.push({
    description: taskInput, // description of the task
    sessionsCurrent: 0, // tracks pomodoro sessions completed working on tasks
    sessionsTotal: taskLength, // tracks total pomodoro session goal for task
    taskComplete: false, // tracks if task is considered complete by user
  });
}

// updates the active profile
export function setActiveProfile(uName) {
  // [] todo: replace for loop search with .find array method
  // searches profilesArray to find object that matches profile clicked in menu
  for (let i = 0; i < profilesArray.length; i++) {
    // if profile menu element matches username of current object
    if (uName === profilesArray[i].username) {
      activeProfile = profilesArray[i];
      break; //break once active profile has been updates
    }
  }

  //update active profile display
  Tasks.tasksHeader.innerText = `Tasks: ${uName}`;
}

//deletes task from tasksArray when delete button is clicked by user
export function deleteTask(taskInputContent) {
  // checks if there is an active task displayed
  if (MyTimer.activeTask.innerText.includes(taskInputContent)) {
    // removes strike though class is applied to active task
    if (MyTimer.activeTask.classList.contains('strikethrough')) {
      MyTimer.activeTask.classList.remove('strikethrough');
    }

    // changes active task display to default text
    MyTimer.activeTask.innerText = 'Active task shown here';
  }

  // [] todo: replace this for loop with .find method
  // iterate through tasksArray of active profile
  for (let i = 0; i < activeProfile.tasksArray.length; i++) {
    // if task in tasksArray matches task being delted
    if (taskInputContent === activeProfile.tasksArray[i].description) {
      // remove this task from tasksArray
      activeProfile.tasksArray.splice(i, 1);
    }
  }
}

// updates profilesArray.tasksArray correctly when a session ends
export function updateSessionsCurrent() {
  let taskTempObject = null; // hold a temp task object
  let taskListChildNum = null; // holds the index needed for task list children of active task

  //update task object in activeProfile.tasksArray
  const taskTemp = MyTimer.activeTask.innerText.slice(6); // get current active task

  // search active profile object for active  task
  for (let i = 0; i < activeProfile.tasksArray.length; i++) {
    // once found set to taskTempObject
    if (activeProfile.tasksArray[i].description === taskTemp) {
      taskTempObject = activeProfile.tasksArray[i];

      // increment sessions spent working on task
      taskTempObject.sessionsCurrent++;

      // if session current reaches total set task complete to true
      if (
        taskTempObject.sessionsCurrent ===
        parseInt(taskTempObject.sessionsTotal)
      ) {
        taskTempObject.taskComplete = true;
      }

      taskListChildNum = i; // set child number of task in taskList
      break;
    }
  }

  const taskListChildren = Tasks.taskList.children; // child nodes of taskList element
  const activeTaskChild = taskListChildren.item(taskListChildNum); // dom node of active task
  const tempTaskInput = activeTaskChild.firstElementChild.firstElementChild; // display content of active task dom node

  // if on session end task is complete
  if (taskTempObject.taskComplete === true) {
    // apply strikethrough class to active task and display in task list
    MyTimer.activeTask.innerText = taskTemp;
    MyTimer.activeTask.classList.add('strikethrough');
    tempTaskInput.value = taskTemp;
    tempTaskInput.classList.add('strikethrough');
  }
  // if task is not complete update number without strikethrough
  else {
    MyTimer.activeTask.innerText = `${taskTempObject.sessionsCurrent}/${taskTempObject.sessionsTotal} | ${taskTemp}`;
    tempTaskInput.value = `${taskTempObject.sessionsCurrent}/${taskTempObject.sessionsTotal} | ${taskTemp}`;
  }
}

// iterates through taskArray of current active task and calls display task for each
export function writeNewTaskDisplay() {
  // ? Use forEach instead ?
  for (let i = 0; i < activeProfile.tasksArray.length; i++) {
    Tasks.displayTask(
      activeProfile.tasksArray[i].description,
      activeProfile.tasksArray[i].sessionsTotal
    );
  }
}

// delete all dom node children of task list
export function clearTaskDisplay() {
  // get count children count of task list
  const childrenCount = Tasks.taskList.children.length;

  // remove each child dom node
  for (let i = 0; i < childrenCount; i++) {
    const child = Tasks.taskList.firstElementChild;
    Tasks.taskList.removeChild(child);
  }
}

//-------------------DEBUG BUTTONS ------------------------------

//loads profile and task dummy data for testing features
let testButton1Clicked = false;
const testButton = document.querySelector('#test-button');
testButton.addEventListener('click', () => {
  if (!testButton1Clicked) {
    newProfileSubmit('Noah', 'Jackson', 'nojackson99');
    writeTaskToProfile('task 1 Noah', '1');
    Tasks.displayTask('task 1 Noah', '1');
    writeTaskToProfile('task 2 Noah ', '3');
    Tasks.displayTask('task 2 Noah', '3');

    newProfileSubmit('Alyssa', 'Kelley', 'akelley883');

    writeTaskToProfile('Task 1 Alyssa', '1');
    Tasks.displayTask('Task 1 Alyssa', '1');
    writeTaskToProfile('Task 2 Alyssa', '5');
    Tasks.displayTask('Task 2 Alyssa', '5');
    writeTaskToProfile('Task 3 Alyssa', '2');
    Tasks.displayTask('Task 3 Alyssa', '2');
    testButton1Clicked = true;
  } else {
    alert(`test data already loaded`);
  }
});

// clear task display
const testButton2 = document.querySelector('#test-button2');
testButton2.addEventListener('click', () => {
  // updateSessionsCurrent();
  clearTaskDisplay();
});

// log profilesArray
const testButton4 = document.querySelector('#test-button4');
testButton4.addEventListener('click', () => {
  console.log(profilesArray);
});
