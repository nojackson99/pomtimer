//npm install easytimer.js --save
// import Timer from "easytimer.js";


// -------------- IMPORTS ---------------------
import '../style.css'
import * as Tasks from './tasks.js'
import * as MyTimer from './timer.js';

// // -------------- FUNCTIONS -------------------
// // This section down to playSound function will hopefully change with easytimer
// // calculate countdown date and call start timer function
// function getCountDownDate() {

//   const now = Date.now();           // calculate and set current time
//   const milliMultiplier = 60000;    // multiplier to convert minutes to milliseconds
//   const calculationOffset = 1000;   // offset calculation for correct timer
  
//   // take minutes and calculate to milliseconds for countdown timer function
//   let cdTime = now + (desiredMinutes * milliMultiplier) + calculationOffset

//   // call timerControl pass in 
//   timerControl(cdTime, desiredMinutes)
// }

// // start count down to passed in count down date
// function timerControl(countDownTime) {

//   // Update the count down every 1 second
//   const timerLoop = setInterval(function () {

//     // Get today's date and time
//     const now = new Date().getTime();

//     // Find the distance between now and the count down date
//     let distance = countDownTime - now;

//     // Time calculations for days, hours, minutes and seconds
//     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     // Output the result to timer display
//     timerDisplay.innerHTML = minutes + ":" + seconds;

//     // If the count down is over, write some text 
//     if (distance < 0) {
//       playSound();
//       clearInterval(timerLoop);
//       timerContainer.classList.replace('large-text', 'finish-text')
//       timerDisplay.innerHTML = "Break Time!";

//     }
//   }, 1000);
// }

// // testing easytimer.js functionality
// // *** Not implemented yet ***
// function easyTimerTest() {
//   var timer = new Timer(/* default config */);
//   timer.start(/* config */);
//   timer.addEventListener("secondsUpdated", function (e) {
//     $("#basicUsage").html(timer.getTimeValues().toString());
//   });

//   console.log(console.log(timer))
// }

// triggers audio file playback
function playSound() {
  alyssaSound.play();
}


// -------------- HTML ELEMENT VARIABLES ------
// timer display
const timerDisplay = document.getElementById("timer-display");
// timer container
const timerContainer = document.getElementById("timer-container")
// start timer button
const startTimerButton = document.getElementById("timer-start");
// test button
const testButton = document.getElementById("test-button");
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

import Timer from "easytimer.js";

// -------------- EVENT LISTENERS -------------

startTimerButton.addEventListener('click', () => {
  MyTimer.startTimer(desiredMinutes);
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
    startTimerButton.innerHTML = "Start Focus";
  } else {
    startTimerButton.innerHTML = "Start Break";
  };

  //ensure large-text class is applied to timerContainer
  //this is necessary because on timer end timer display text will be smaller to accomodate end timer message
  timerContainer.classList.replace('small-text', 'large-text');

  //change to theme class to the correct one
  siteBody.className = `${classTheme}`;
}

// control adding new tasks, editing and deleting
Tasks.form.addEventListener('submit', Tasks.newTask );