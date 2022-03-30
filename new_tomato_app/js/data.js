import Timer from 'easytimer.js';
import * as Header from './header.js';
import * as Tasks from './tasks.js';
import * as MyTimer from './timer.js';

// array to hold all profile objects
export const profilesArray = [];

//holds next profile ID
let nextProfileID = 0;             // tracks available id for profile instantiation
 
export let activeProfile = null;   // holds the current activeProfile as an object

// writes task submitted throuhg new task form to activeProfile.taskArray
export function writeTaskToProfile(taskInput,taskLength) {    

    // pushes a new task object to tasksArray
    // [] todo: add task id
    activeProfile.tasksArray.push({
        description: taskInput,   // description of the task
        sessionsCurrent: 0,             // tracks pomodoro sessions completed working on tasks
        sessionsTotal: taskLength,      // tracks total pomodoro session goal for task
        taskComplete: false             // tracks if task is considered complete by user
    });
}

// updates the active profile
function setActiveProfile(uName) {
    
    // searches profilesArray to find object that matches profile clicked in menu
    for (let i = 0; i < profilesArray.length; i++) {
        // if profile menu element matches username of current object
        if (uName === profilesArray[i].username) {
            activeProfile = profilesArray[i];
            break;  //break once active profile has been updates
        }
    }

    // [] todo: replace for loop search with .find array method
    // const foundItem = profilesArray.find((item) => {
    //     return item.id;
    // })

    // console.log(foundItem);


    // ! Remove comments when done debugging tag: D1
    // update active profile display
    //Tasks.tasksHeader.innerText = `Tasks: ${uName}`
    
    // ! Debug code below remove when doen debugging tag: D1
    const tasksHeader = document.querySelector("#tasks-header");
    tasksHeader.innerText = `Tasks:  ${uName}`;
}

export function newProfileSubmit(fName,lName,uName) {
    // close profile modal on successful submission of form
    Header.profileModal.close();

    // get nextProfileID to set as ID for new profile object
    const myid = nextProfileID;
    nextProfileID++;
    
    
    
    profilesArray.push(
        {
            id: myid,
            nextTaskID: 0,
            firstName: fName,
            lastName: lName,
            username: uName,
            tasksArray: []
        
        }
    )
    
    // set profile to active
    setActiveProfile(uName);
    clearTaskDisplay();
    
    // add new profile html element to profile menu
    let profileMenuElement = document.createElement("p");
    profileMenuElement.innerText = `${uName}`;
    Header.dropdownContent.appendChild(profileMenuElement);
    
    // set event listener to update activeProfile when profile is clicked in menu
    profileMenuElement.addEventListener('click', (e)=> {
        setActiveProfile(e.currentTarget.innerText)
        clearTaskDisplay();
        writeNewTaskDisplay();
    })
}



export function deleteTask(taskInputContent) {

    console.log(taskInputContent);
    console.log(MyTimer.activeTask.innerText);


    if(MyTimer.activeTask.innerText.includes(taskInputContent)) {
        if (MyTimer.activeTask.classList.contains("strikethrough")) {
            MyTimer.activeTask.classList.remove("strikethrough");
        }

        console.log(`in delte task if`)
        MyTimer.activeTask.innerText = "Active task shown here"
    }

    // [] todo: replace this for loop with .find method
    for (let i = 0; i < activeProfile.tasksArray.length; i++) {
        if (taskInputContent === activeProfile.tasksArray[i].description) {
            activeProfile.tasksArray.splice(i,1);
        }
    }
}

// updates profilesArray.tasksArray correctly when a session ends
export function updateSessionsCurrent() {

    let taskTempObject = null;

    // holds the index needed for task list children of active task
    let taskListChildNum = null;

    //update task object in activeProfile.tasksArray
    // get active task
    const taskTemp = MyTimer.activeTask.innerText.slice(6);

    // search active profile object for active  task
    console.log(activeProfile)
    console.log(`activeProfile.taskArray.length: ${activeProfile.tasksArray.length}`)
    for (let i = 0; i < activeProfile.tasksArray.length; i++) {
        // once found set to taskkTempObject
        if (activeProfile.tasksArray[i].description === taskTemp) {
            taskTempObject = activeProfile.tasksArray[i]


            // increment sessions spent working on task
            taskTempObject.sessionsCurrent++;

            // if session total reached  set task complete to true
            if (taskTempObject.sessionsCurrent === parseInt(taskTempObject.sessionsTotal)) {
                taskTempObject.taskComplete = true;
            }


            taskListChildNum = i;

            break;
        }
    }



    const taskListChildren = Tasks.taskList.children;                           // child nodes of taskList element
    const activeTaskChild =  taskListChildren.item(taskListChildNum);           // dom node of active task

    console.log(activeTaskChild);

    const tempTaskInput = activeTaskChild.firstElementChild.firstElementChild   // display content of active task dom node

    // if on session end task is complete
    if (taskTempObject.taskComplete === true) {
        // update task display in active task and in task list correctly
        MyTimer.activeTask.innerText = taskTemp;
        MyTimer.activeTask.classList.add("strikethrough");
        tempTaskInput.value = taskTemp;
        tempTaskInput.classList.add("strikethrough");
    }
    // if task is not complete update number without strikethrough
    else {
        MyTimer.activeTask.innerText = `${taskTempObject.sessionsCurrent}/${taskTempObject.sessionsTotal} | ${taskTemp}`
        tempTaskInput.value = `${taskTempObject.sessionsCurrent}/${taskTempObject.sessionsTotal} | ${taskTemp}`
    }
}

function writeNewTaskDisplay() {
    for (let i = 0; i < activeProfile.tasksArray.length; i++) {
        Tasks.displayTask(activeProfile.tasksArray[i].description,activeProfile.tasksArray[i].sessionsTotal);
    }

}

function clearTaskDisplay() {
    const childrenCount = Tasks.taskList.children.length;
    console.log(childrenCount)

    for (let i = 0; i < childrenCount; i++) {
        const child = Tasks.taskList.firstElementChild;
        Tasks.taskList.removeChild(child);
    }
}


// ! Profile and task debug code remove when finished debugging tag: D1
const testButton =  document.querySelector("#test-button")
testButton.addEventListener('click', ()=> {
    newProfileSubmit('Noah','Jackson','nojackson99')
    writeTaskToProfile('task 1 noah','1');
    Tasks.displayTask('task 1 noah','1');
    writeTaskToProfile('task 2 noah ','3');
    Tasks.displayTask('task 2 noah','3');

    newProfileSubmit('Alyssa','Kelley','akelley883')

    writeTaskToProfile('this is task 1','1');
    Tasks.displayTask('this is task 1','1');
    writeTaskToProfile('this is task 2','3');
    Tasks.displayTask('this is task 2','3');
    // writeTaskToProfile('this is task 3','6');
    // Tasks.displayTask('this is task 3','6');
    // writeTaskToProfile('this is task 4','2');
    // Tasks.displayTask('this is task 4','2');
})

const testButton2 = document.querySelector("#test-button2")
testButton2.addEventListener('click', ()=> {
    // updateSessionsCurrent();
    clearTaskDisplay();
});
