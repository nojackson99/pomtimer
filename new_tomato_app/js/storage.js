//----------------------------------------------------main.js------------------------------------------------------
// This file holds code associated with loading and saving data using local storage and fetch api
//-----------------------------------------------------------------------------------------------------------------

import * as Data from './data.js';        //data associated code
import * as Tasks from './tasks.js';      //task associated code

// save site data to local storage
// function saveToLocal() {

// }

// load site data from local storage
// function loadFromLoca() {

// }

// async fetch dummy profile and task data using fetch api
// this will fetch 2 dummy proifles and create them in the front-end
// and 5 dummy tasks, assigning 3 to first profile and 2 to second profile
let loadWithFetchCalled = false;

const loadWithFetch = async () => {
    // url for dummy user generated json server
    const url = "https://github.com/nojackson99/repo/sample_data/db.json";

    // try catch block ensures fetch request is successful and console logs error on failure
    try {
        //urls for profile data from dummy json server
        const profileUrl1 = "https://jsonplaceholder.typicode.com/users/1";     
        const profileUrl2 = "https://jsonplaceholder.typicode.com/users/2";

        //urls for  todo data form dummy json server
        const todoUrl1 = "https://jsonplaceholder.typicode.com/todos/1"
        const todoUrl2 = "https://jsonplaceholder.typicode.com/todos/2"
        const todoUrl3 = "https://jsonplaceholder.typicode.com/todos/3"
        const todoUrl4 = "https://jsonplaceholder.typicode.com/todos/4"
        const todoUrl5 = "https://jsonplaceholder.typicode.com/todos/5"

        // await resolve from all profile fetch requests
        const profileResults = await Promise.all([
            fetch(profileUrl1), fetch(profileUrl2)
        ])

        //await resolve from all todo fetch requests
        const todoResults = await Promise.all([
            fetch(todoUrl1), fetch(todoUrl2), fetch(todoUrl3), fetch(todoUrl4), fetch(todoUrl5)
        ])

        // iterate through profileResults to ensure all fetch calls returned ok
        for (let i = 0; i < profileResults.length; i++) {
            if(profileResults[i].ok === false) {
                // custom exception thrown when ok returns false
                throw 'profileResults not ok'
            }
        }
        console.log(`profileResults ok`)

        // iterate through todoResults to ensure all fetch calls returned ok
        for (let i = 0; i < todoResults.length; i++) {
            if(todoResults[i].ok === false)
            // custom exeception thrown when ok returns false
            throw 'profileResults not ok'
            
        }
        console.log(`todoResults ok`)

        // calls .json() on each element of profilePromises
        const profilePromises = profileResults.map(result => result.json())
        // profileFinalData awaits the resolve return from each promise
        const profileFinalData = await Promise.all(profilePromises)
        
        // calls .json() on each element of todoPromises
        const todoPromises = todoResults.map(result => result.json())
        // todoFinalData awaits the resolve return from each promise
        const todoFinalData = await Promise.all(todoPromises);

        // iterate through profileFinalData getting name and username properties
        for (let i = 0; i < profileFinalData.length; i++) {
            
            // name is split into namesArray which will be first name and last name
            const namesArray = profileFinalData[i].name.split(" ");
            const username = profileFinalData[i].username;

            // newProfileSubmit called with data from profileFinalData
            Data.newProfileSubmit(namesArray[0],namesArray[1],username)
        }

        // iterate throuhg todoFinalData getting title of each task
        for (let i = 0; i < todoFinalData.length; i++) {
            
            const title = todoFinalData[i].title;

            // writes task to profile and displays in dom
            Data.writeTaskToProfile(title,1);
            Tasks.displayTask(title,1);

            // changes active profile to Bret after first three tasks are processed
            if (i === 2) {
                Data.setActiveProfile(profileFinalData[0].username)
                Data.clearTaskDisplay();
                Data.writeNewTaskDisplay();
            }

        }

        // sets this bool to true to ensure fetch test is only executed once per page refresh
        loadWithFetchCalled = true;

    }catch(err) {
        console.error(err)
    }
}


// calls loadWithFetch to test fetch api usage
const testButton5 = document.querySelector("#test-button5")
testButton5.addEventListener('click', ()=> {
    if (loadWithFetchCalled === false) {
        loadWithFetch()
    }
    else {
        alert(`fetch test has already been called`)
    } 
})

