import * as Header from './header.js';
import * as Tasks from './tasks.js';

const profilesArray = [];

//holds next profile ID
let nextProfileID = 0;
let activeProfile = null;

// const task = {
//     description: "",
//     sessionsCurrent: 0,
//     sessionsTotal: 0,
//     taskComplete: false,

//     support methods
// }

// add new profile to profilesArray
Header.newProfileSubmit.addEventListener('click', (e)=> {

    Header.profileModal.close();

    // get nextProfileID to set as ID for new profile object
    const myid = nextProfileID;
    nextProfileID++;

    const fName = Header.newProfileFirstName.value;
    const lName = Header.newProfileLastName.value;
    const uName = Header.newProfileUsername.value;

    profilesArray.push(
        {
            id: myid,
            firstName: fName,
            lastName: lName,
            username: uName,
            tasksArray: []
        
            //support methods
        }
    )

    // set profile to active
    setActiveProfile(uName);

    // add new profile to profile menu
    let profileMenuElement = document.createElement("p");
    profileMenuElement.innerText = `${uName}`;
    Header.dropdownContent.appendChild(profileMenuElement);

    profileMenuElement.addEventListener('click', (e)=> {
        setActiveProfile(e.currentTarget.innerText)
    })
        
})

function setActiveProfile(uName) {
    activeProfile = uName;

    Tasks.tasksHeader.innerText = `Tasks: ${uName}`    
}



// console.log(profilesArray);

// profilesArray[0] = {
//     ID: 0,
//     firstName: "Noah",
//     lastName: "Jackson",
//     username: "nojackson99",
//     tasksArray: []

//     //support methods
// };

// profilesArray[1]= {
//     ID: 1,
//     firstName: "alyssa",
//     lastName: "kelley",
//     username: "akelley883",
//     tasksArray: []

//     //support methods
// };

// profilesArray.push(
//     {
//         ID: 1,
//         firstName: "alyssa",
//         lastName: "kelley",
//         username: "akelley883",
//         tasksArray: []
    
//         //support methods
//     }
// );