//================================================----theme.js----=================================================
// This segment of code handles changing the site theme and the timer length
// applies correct site theme, timerlength and necessary changes
//================================================-----------------================================================


// -------------- IMPORTS ---------------------
import * as Data from './data.js';        //data associated code
import * as MyTimer from './timer.js';    //timer associated code

// site body html element
export const siteBody = document.getElementById("site-body");   

// theme classes used for holding the class name when changing themes
export const pomTheme = 'pomodoro-red';
export const shortTheme = 'short-break-green';
export const longTheme = 'long-break-blue';

// [X] todo: allow timer lengths to be changed by user
// [] todo: refactor to move these variables and sessionLength to data.js
// control pom and break lengths
export let workLength = 25;
export let shortBreak = 5;
export let longBreak = 20;

// set default timer length to current workLength
export let sessionLength = workLength;

// changes the site color theme and the starting time for the timer object
export function changeTheme(timerLength,classTheme) {

    sessionLength = timerLength;                                  // change timer length when starting timer object
    MyTimer.timerDisplay.innerText = `${timerLength}:00`;         // change timer display
  

    // change start timer button display
    if(classTheme === pomTheme) {
      MyTimer.startButton.innerText = "Start Focus";  //button displays start focus when on pomodoro theme
    } else {
      MyTimer.startButton.innerText = "Start Break";  //button displays start break when on short or long break theme
    }
  
    // ensure large-text class is applied to timerContainer
    // necessary because on timer end timer display text will be smaller to accomodate end timer message
    MyTimer.timerContainer.classList.replace('small-text', 'large-text');
  
    // change theme class to the correct one
    siteBody.className = `${classTheme}`;
}

// update workLength shortBreak and longBreak from settings submit
// [] todo: refactor changing session lengths from settings
export function updateSessionLengths(pom,short,long) {
  workLength = pom;
  shortBreak = short;
  longBreak = long;

  if (siteBody.classList.contains("pomodoro-red")) {
    MyTimer.timerDisplay.innerText = `${workLength}:00`
    sessionLength = workLength
  } 
  else if (siteBody.classList.contains("short-break-green")) {
    MyTimer.timerDisplay.innerText = `${shortBreak}:00`
    sessionLength = shortBreak;
  }
  else {
    MyTimer.timerDisplay.innerText = `${longBreak}:00`
    sessionLength = longBreak
  }
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