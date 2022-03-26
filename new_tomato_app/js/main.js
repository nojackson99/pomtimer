// -------------- IMPORTS ---------------------
import '../style.css'
import * as Tasks from './tasks.js'
import * as MyTimer from './timer.js';


// -------------- HTML ELEMENT VARIABLES ------
// timer display
const timerDisplay = document.getElementById("timer-display");
// timer container
const timerContainer = document.getElementById("timer-container")
// start timer button
const startButton = document.getElementById("timer-start");
// app body
const siteBody = document.getElementById("site-body");


// -------------- OTHER VARIABLES -------------
// control pom and break lengths
let workLength = 25;
let shortBreak = 5;
let longBreak = 20;

// set defualt timer length to current workLength
let desiredMinutes = workLength;

// theme classes
const pomTheme = 'pomodoro-red';
const shortTheme = 'short-break-green';
const longTheme = 'long-break-blue';

// -------------- EVENT LISTENERS -------------

startButton.addEventListener('click', (e) => {
  MyTimer.startTimer(desiredMinutes, e);


})

// -------------- CHANGE THEME ----------------
// This segment of code handles changing the site theme and the timer length
// Pomodoro button will apply a red theme
// Short Break button will apply a sea green theme
// Long Break button will apply a blue theme
// querySelectorAll grabs all three timer control buttons and adds event listener to each
document.querySelectorAll('.button-flex-child').forEach(item => {
  item.addEventListener('click', event => {
    // using .currentTarget.inneText from event object call changeTheme() with correct theme and timer length
    if (event.currentTarget.innerText == "Pomodoro") {
      changeTheme(workLength,pomTheme)
    } 
    else if (event.currentTarget.innerText == "Short Break") {
      changeTheme(shortBreak,shortTheme)
    }
    else {
      changeTheme(longBreak,longTheme)
    }
  })
})

// applys correct body theme, timerlength and necessary changes
function changeTheme(timerLength,classTheme) {
  desiredMinutes = timerLength;                     // change timer length
  timerDisplay.innerHTML = `${timerLength}:00`;     // change timer display

  //change start timer button display
  if(classTheme === "pomodoro-red") {
    startButton.innerHTML = "Start Focus";
  } else {
    startButton.innerHTML = "Start Break";
  };

  //ensure large-text class is applied to timerContainer
  //this is necessary because on timer end timer display text will be smaller to accomodate end timer message
  timerContainer.classList.replace('small-text', 'large-text');

  //change to theme class to the correct one
  siteBody.className = `${classTheme}`;
}

// control adding new tasks, editing and deleting
Tasks.form.addEventListener('submit', Tasks.newTask );