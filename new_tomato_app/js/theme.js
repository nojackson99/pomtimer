//----------------------------------------------------theme.js----------------------------------------------------
// The code in this file handles changing the site theme and the timer length. Also holds varriables controlling
// session lengths and timer length when timer.start() is called. Sets event listeners for theme change buttons
// above the timer
//-----------------------------------------------------------------------------------------------------------------

// -------------- IMPORTS ---------------------
import { LocalStorage } from './localStorage.js';
import * as MyTimer from './timer.js'; //timer associated code

// declare instance of LocalStorage
const localStorageRef = new LocalStorage();

// site body html element
export const siteBody = document.getElementById('site-body');

// theme classes used for holding the class name when changing themes
export const pomTheme = 'pomodoro-red';
export const shortTheme = 'short-break-green';
export const longTheme = 'long-break-blue';

// [] todo: refactor to move these variables and sessionLength to data.js
// control pom and break lengths
// load data from localStorage or default values defines in localStorage.js
export let sessionLengths = localStorageRef.loadSessionLengths();

// set default timer length to current workLength
export let sessionLength = sessionLengths.pomodoro;

$('#timer-display').html(`${sessionLengths.pomodoro}:00`);

// changes the site color theme and the starting time for the timer object
export function changeTheme(timerLength, classTheme) {
  sessionLength = timerLength; // change timer length when starting timer object
  MyTimer.timerDisplay.innerText = `${timerLength}:00`; // change timer display

  // change start timer button display
  if (classTheme === pomTheme) {
    MyTimer.startButton.innerText = 'Start Focus'; //button displays start focus when on pomodoro theme
  } else {
    MyTimer.startButton.innerText = 'Start Break'; //button displays start break when on short or long break theme
  }

  // change site body class to new theme
  siteBody.className = `${classTheme}`;
}

// update workLength shortBreak and longBreak from settings submit
export function updateSessionLengths(pom, short, long) {
  // update session length control variables from form submit
  sessionLengths.pomodoro = pom;
  sessionLengths.shortBreak = short;
  sessionLengths.longBreak = long;

  localStorageRef.saveSessionLengths(sessionLengths);

  // update timer display depending on current theme
  if (siteBody.classList.contains('pomodoro-red')) {
    MyTimer.timerDisplay.innerText = `${pom}:00`;
    sessionLength = pom;
  } else if (siteBody.classList.contains('short-break-green')) {
    MyTimer.timerDisplay.innerText = `${short}:00`;
    sessionLength = short;
  } else {
    MyTimer.timerDisplay.innerText = `${long}:00`;
    sessionLength = long;
  }
}

// select all three timer control buttons and add event listener to each
document.querySelectorAll('.button-flex-child').forEach((item) => {
  item.addEventListener('click', (event) => {
    // call resetTimer when a timer has been started since site load
    // this ensures start button will not resume previously started timer object
    if (MyTimer.timerStarted) {
      MyTimer.resetTimer();
    }

    // using .currentTarget.innerText from event object call changeTheme() with correct theme and timer length
    if (event.currentTarget.innerText == 'Pomodoro') {
      changeTheme(sessionLengths.pomodoro, pomTheme);
    } else if (event.currentTarget.innerText == 'Short Break') {
      changeTheme(sessionLengths.shortBreak, shortTheme);
    } else {
      changeTheme(sessionLengths.longBreak, longTheme);
    }
  });
});
