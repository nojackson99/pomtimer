import * as Header from './header.js';

const profilesArray = [];

//holds next profile ID
let nextProfileID = 0;


// const profile = {
//     id: 0,
//     firstName: "",
//     lastName: "",
//     username: "",
//     tasksArray: []

//     //support methods
// }

const task = {
    description: "",
    sessionsCurrent: 0,
    sessionsTotal: 0,
    taskComplete: false,

    //support methods
}

//const profilesArray = [];

console.log(Header.dropdownContent);


Header.newProfileSubmit.addEventListener('click', (e)=> {
    e.preventDefault();

    Header.profileModal.close();

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

    let profileMenuElement = document.createElement("p");
    profileMenuElement.innerText = `${uName}`;

    console.log(profileMenuElement);

    Header.dropdownContent.appendChild(profileMenuElement);


    console.log(profilesArray);
})

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