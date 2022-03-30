// [X] todo: break away as much code from main into modules

// HTML todo's
// [X] todo: show active task below start focus button
// [X] todo: settings button that opens modal (maybe in top right?)
// [X] todo: profie button that allows for switching to new profile or creating a new one (maybe top left)
// [] todo: checkbox next to each task that when clicked strikesthrough task
// [] todo:
// [] todo:
// [] todo:
// [] todo:


// -------------- IMPORTS ---------------------
import '../style.css';
import * as Tasks from './tasks.js';      //task associated code
import * as MyTimer from './timer.js';    //timer associated code
import * as Theme from './theme.js';      //theme associated code
import * as Header from './header.js';
import * as Data from './data.js';

const testButton = document.querySelector("#test-button");

testButton.addEventListener('click', ()=> {
    console.log(`active profile object:`)
    console.log(Data.activeProfile.tasksArray[0]);

    console.log(`objects retrieved from profilesArray`)
    console.log(Data.profilesArray[0].tasksArray[0]);
    console.log(Data.profilesArray[1].tasksArray[0]);
})



