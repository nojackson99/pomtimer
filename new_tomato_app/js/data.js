import * as Header from './header.js';
import * as Tasks from './tasks.js';

// array to hold all profile objects
export const profilesArray = [];

//holds next profile ID
let nextProfileID = 0;             // tracks available id for profile instantiation
 
export let activeProfile = null;   // holds the current activeProfile as an object

// writes task submitted throuhg new task form to activeProfile.taskArray
export function writeTaskToProfile() {

    // gets task description and length from new task form
    const taskDescription = Tasks.taskInput.value
    const taskLength = Tasks.taskLength.value

    // reset form input boxes to placeholder text
    Tasks.taskInput.value = "";
    Tasks.taskLength.value = "";

    console.log(`Task Descripton: ${taskDescription}`)
    console.log(`Task Length: ${taskLength}`)

    console.log

    // pushes a new task object to tasksArray
    activeProfile.tasksArray.push({
        description: taskDescription,   // description of the task
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

    console.log(`active profile is`);
    console.log(activeProfile);

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
    
    // add new profile html element to profile menu
    let profileMenuElement = document.createElement("p");
    profileMenuElement.innerText = `${uName}`;
    Header.dropdownContent.appendChild(profileMenuElement);
    
    // set event listener to update activeProfile when profile is clicked in menu
    profileMenuElement.addEventListener('click', (e)=> {
        setActiveProfile(e.currentTarget.innerText)
    })
}

// add new profile to profilesArray
Header.newProfileSubmit.addEventListener('click', ()=> {
    const fName = Header.newProfileFirstName.value;
    const lName = Header.newProfileLastName.value;
    const uName = Header.newProfileUsername.value;
    newProfileSubmit(fName,lName,uName)
});

export function deleteTask() {

}


// ! Profile and task debug code remove when finished debugging tag: D1
newProfileSubmit('Noah','Jackson','nojackson99')
newProfileSubmit('Alyssa','Kelley','akelley883')


