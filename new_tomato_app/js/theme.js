// -------------- theme.js --------------------
// This segment of code handles changing the site theme and the timer length
// applies correct site theme, timerlength and necessary changes


// -------------- IMPORTS ---------------------
import * as MyTimer from './timer.js';    //timer associated code
import * as Tasks from './tasks.js';      //task associated code

// -------------- VARIABLES -------------------
export const siteBody = document.getElementById("site-body");   // app body

// theme classes
export const pomTheme = 'pomodoro-red';
export const shortTheme = 'short-break-green';
export const longTheme = 'long-break-blue';

// [] todo: allow timer lengths to be changed by user
// control pom and break lengths
export const workLength = 25;
export const shortBreak = 5;
export const longBreak = 20;

// set default timer length to current workLength
export let desiredMinutes = workLength;


export function changeTheme(timerLength,classTheme) {
    desiredMinutes = timerLength;                             // change timer length
    MyTimer.timerDisplay.innerHTML = `${timerLength}:00`;     // change timer display
  
  
    // change start timer button display
    if(classTheme === pomTheme) {
      MyTimer.startButton.innerHTML = "Start Focus";
    } else {
      MyTimer.startButton.innerHTML = "Start Break";
    }
  
    // ensure large-text class is applied to timerContainer
    // necessary because on timer end timer display text will be smaller to accomodate end timer message
    MyTimer.timerContainer.classList.replace('small-text', 'large-text');
  
    // change theme class to the correct one
    siteBody.className = `${classTheme}`;
}
  
// select all three timer control buttons and add event listener to each
document.querySelectorAll('.button-flex-child').forEach(item => {
    item.addEventListener('click', event => {
  
      // call resetTimer( when a timer has been started since site load
      if (MyTimer.timerStarted) {
        MyTimer.resetTimer(); 
      }
  
      // using .currentTarget.innerText from event object call changeTheme() with correct theme and timer length
      if (event.currentTarget.innerText == "Pomodoro") {
        changeTheme(workLength,pomTheme);
      } 
      else if (event.currentTarget.innerText == "Short Break") {
        changeTheme(shortBreak,shortTheme);
      }
      else {
        changeTheme(longBreak,longTheme);
      }
    })
});