//npm install easytimer.js --save
// import Timer from "easytimer.js";


// -------------- IMPORTS ---------------------
import './style.css'


// -------------- FUNCTIONS -------------------
// This section down to playSound function will hopefully change with easytimer
// calculate countdown date and call start timer function
function getCountDownDate() {

  const now = Date.now();           // calculate and set current time
  const milliMultiplier = 60000;    // multiplier to convert minutes to milliseconds
  const calculationOffset = 1000;   // offset calculation for correct timer
  
  // take minutes and calculate to milliseconds for countdown timer function
  let cdTime = now + (desiredMinutes * milliMultiplier) + calculationOffset

  // call timerControl pass in 
  timerControl(cdTime, desiredMinutes)
}

// start count down to passed in count down date
function timerControl(countDownTime) {

  // Update the count down every 1 second
  const timerLoop = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownTime - now;

    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result to timer display
    timerDisplay.innerHTML = minutes + ":" + seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
      playSound();
      clearInterval(timerLoop);
      timerContainer.classList.replace('large-text', 'finish-text')
      timerDisplay.innerHTML = "Break Time!";

    }
  }, 1000);
}

// testing easytimer.js functionality
// *** Not implemented yet ***
function easyTimerTest() {
  var timer = new Timer(/* default config */);
  timer.start(/* config */);
  timer.addEventListener("secondsUpdated", function (e) {
    $("#basicUsage").html(timer.getTimeValues().toString());
  });

  console.log(console.log(timer))
}

// triggers audio file playback
function playSound() {
  alyssaSound.play();
}


// -------------- SOUND VARIABLES -------------
var alyssaSound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
var buttonClick = new Audio('/misc_project_files/button_click.mp3') // sound from zapsplat.com
var ringingBell = new Audio('/misc_project_files/ringing_bell.mp3')


// -------------- HTML ELEMENT VARIABLES ------
// timer display
const timerDisplay = document.getElementById("timer-display");
// timer container
const timerContainer = document.getElementById("timer-container")
// start timer button
const startTimerButton = document.getElementById("timer-start");

// task related elements
const submitTaskButton = document.getElementById("submit-button");
const taskSubmitBox = document.getElementById("new-task");

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


// -------------- EVENT LISTENERS -------------

// start timer function when start focus button is pressed
startTimerButton.addEventListener('click', function () {
  buttonClick.play();
  getCountDownDate();
});

// // set timer length to pomadoro
// pomodoroTimerButton.addEventListener('click', function () {

//   // set timer variable and timer display to correct length
//   desiredMinutes = workLength;
//   timerDisplay.innerHTML = `${workLength}:00`
//   startTimerButton.innerHTML = "Start Focus"

//   timerContainer.classList.replace('small-text', 'large-text')
//   if (siteBody.classList.contains(`${shortTheme}`)) siteBody.classList.replace(`${shortTheme}`, `${pomTheme}`)
//   else if (siteBody.classList.contains(`${longTheme}`)) siteBody.classList.replace(`${longTheme}`, `${pomTheme}`)
//   else null;

// });
// // set timer length to short break
// shortBreakButton.addEventListener('click', function () {
//   desiredMinutes = shortBreak;
//   timerDisplay.innerHTML = `${shortBreak}:00`
//   startTimerButton.innerHTML = "Start Break"

//   timerContainer.classList.replace('small-text', 'large-text')
//   if (siteBody.classList.contains(`${pomTheme}`)) siteBody.classList.replace(`${pomTheme}`, `${shortTheme}`)
//   else if (siteBody.classList.contains(`${longTheme}`)) siteBody.classList.replace(`${longTheme}`, `${shortTheme}`)
//   else null;
// });
// // set timer length to long break
// longBreakButton.addEventListener('click', function () {
//   desiredMinutes = longBreak;
//   timerDisplay.innerHTML = `${longBreak}:00`
//   startTimerButton.innerHTML = "Start Break"


//   timerContainer.classList.replace('small-text', 'large-text')
//   if (siteBody.classList.contains(`${pomTheme}`)) siteBody.classList.replace(`${pomTheme}`, `${longTheme}`)
//   else if (siteBody.classList.contains(`${shortTheme}`)) siteBody.classList.replace(`${shortTheme}`, `${longTheme}`)
//   else null;
// });

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

// [] todo: task allignment
// [] todo: use chrome storage to store tasks
// [] todo: break into separate file?
// [] todo: create profiles with classes that track user name and tasks 
// -------------- TASK MODULE -----------------
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#new-task-input");
const taskList = document.querySelector("#tasks");
//const taskLength = document.querySelector("#new-task-length")


// test button for various uses
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = taskInput.value;
  //const length = taskLength.value;

  if ( (!task) ) {
    alert("Please add a task and length before attempting to submit")
  }

  //create new task div
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  //create new task content div
  const taskContentElement = document.createElement("div");
  taskElement.classList.add("content");
  taskElement.innerText = task;

  //append task content to task
  taskElement.appendChild(taskContentElement);

  //append task to task list
  taskList.appendChild(taskElement);

  return;
})

console.log(form);
