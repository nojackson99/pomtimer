const profilesArray = [];

const profile = {
    ID: 0,
    firstName: "",
    lastName: "",
    username: "",
    tasksArray: []

    //support methods
}

const task = {
    description: "",
    sessionsCurrent: 0,
    sessionsTotal: 0,
    taskComplete: false,

    //support methods
}

console.log(profilesArray);

profilesArray[0] = {
    ID: 0,
    firstName: "Noah",
    lastName: "Jackson",
    username: "nojackson99",
    tasksArray: []

    //support methods
};

profilesArray[1]= {
    ID: 1,
    firstName: "alyssa",
    lastName: "kelley",
    username: "akelley883",
    tasksArray: []

    //support methods
};

profilesArray.push(
    {
        ID: 1,
        firstName: "alyssa",
        lastName: "kelley",
        username: "akelley883",
        tasksArray: []
    
        //support methods
    }
);

function createNewProfile (fName,lName,uName) {
    profilesArray.push(
        {
            ID: 1,
            firstName: "alyssa",
            lastName: "kelley",
            username: "akelley883",
            tasksArray: []
        
            //support methods
        }
    )
}