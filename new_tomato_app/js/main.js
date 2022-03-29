// [X] todo: break away as much code from main into modules

// HTML todo's
// [] todo: show active task below start focus button
// [] todo: settings button that opens modal (maybe in top right?)
// [] todo: profie button that allows for switching to new profile or creating a new one (maybe top left)
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

const newProfileButton = document.querySelector("#create-new-profile")
const newProfileModal = document.querySelector("#new-profile-modal")
const closeProfileModal = document.querySelector("#close-profile-modal")

newProfileButton.addEventListener('click', ()=> {
    console.log('clicked');
    newProfileModal.showModal();
})

closeProfileModal.addEventListener('click', ()=> {
    newProfileModal.close();
})