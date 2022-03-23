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
const taskList = document.querySelector('.task-list');

// test button
const testButton = document.getElementById("test-button");

// set timer length buttons
const pomodoroTimerButton = document.getElementById("pomodoro-button")
const shortBreakButton = document.getElementById("short-break-button")
const longBreakButton = document.getElementById("long-break-button");

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


// -------------- EVENT LISTENERS ------------

// start timer function when start focus button is pressed
startTimerButton.addEventListener('click', function () {
  buttonClick.play();
  getCountDownDate();
});

// [] todo: fix these 3 eventListeners with map?
// set timer length to pomadoro
pomodoroTimerButton.addEventListener('click', function () {

  // set timer variable and timer display to correct length
  desiredMinutes = workLength;
  timerDisplay.innerHTML = `${workLength}:00`
  startTimerButton.innerHTML = "Start Focus"

  timerContainer.classList.replace('small-text', 'large-text')
  if (siteBody.classList.contains(`${shortTheme}`)) siteBody.classList.replace(`${shortTheme}`, `${pomTheme}`)
  else if (siteBody.classList.contains(`${longTheme}`)) siteBody.classList.replace(`${longTheme}`, `${pomTheme}`)
  else null;

});
// set timer length to short break
shortBreakButton.addEventListener('click', function () {
  desiredMinutes = shortBreak;
  timerDisplay.innerHTML = `${shortBreak}:00`
  startTimerButton.innerHTML = "Start Break"


  timerContainer.classList.replace('small-text', 'large-text')
  if (siteBody.classList.contains(`${pomTheme}`)) siteBody.classList.replace(`${pomTheme}`, `${shortTheme}`)
  else if (siteBody.classList.contains(`${longTheme}`)) siteBody.classList.replace(`${longTheme}`, `${shortTheme}`)
  else null;

});
// set timer length to long break
longBreakButton.addEventListener('click', function () {
  desiredMinutes = longBreak;
  timerDisplay.innerHTML = `${longBreak}:00`
  startTimerButton.innerHTML = "Start Break"


  timerContainer.classList.replace('small-text', 'large-text')
  if (siteBody.classList.contains(`${pomTheme}`)) siteBody.classList.replace(`${pomTheme}`, `${longTheme}`)
  else if (siteBody.classList.contains(`${shortTheme}`)) siteBody.classList.replace(`${shortTheme}`, `${longTheme}`)
  else null;


});

// display new task from input field
// [] todo: task allignment
// [] todo: use chrome storage to store tasks
submitTaskButton.addEventListener('click', function () {
  //text submitted in new task box
  const task = taskSubmitBox.value;
  //new list element to be appended to task list 
  let taskListNode = document.createElement('li');
  //populates new list element with submitted task
  taskListNode.appendChild(document.createTextNode(`${task}`));
  //appends new complete list element to current task list
  taskList.appendChild(taskListNode);
  //console.log(task);


})

// test button for various uses
testButton.addEventListener('click', easyTimerTest)

