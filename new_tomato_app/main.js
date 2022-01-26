import './style.css'

// calculates countdown date and calls start timer function
function getCountDownDate() {

  const now = Date.now();           // calculates and sets current time
  const milliMultiplier = 60000;    // multiplier to convert minutes to milliseconds
  const calculationOffset = 1000;   // offsets calculation for correct timer
  
  // takes minutes and calculates to milliseconds for countdown timer function
  let cdTime = now + (desiredMinutes * milliMultiplier) + calculationOffset

  timerControl(cdTime, desiredMinutes)
}

// starts count down to passed in count down date
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
      timerDisplay.innerHTML = "Session over";

    }
  }, 1000);
}

// triggers audio file playback
function playSound() {
  alyssaSound.play();
}

// -------------- Sound Variables -------------
var alyssaSound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
var buttonClick = new Audio('/misc_project_files/button_click.mp3')

// -------------- HTML Elements -------------
// timer display
const timerDisplay = document.getElementById("timer-display");
// start focus button
const startTimerButton = document.getElementById("timer-start");
// test sound button
const playSoundButton = document.getElementById("test-button");
// set 5 and 25 minute timer buttons
const pomodoroTimerButton = document.getElementById("pomodoro-button")
const shortBreakButton = document.getElementById("short-break-button")
const longBreakButton = document.getElementById("long-break-button");

// controls length of timer
let desiredMinutes = 25;

// starts timer function when start focus button is pressed
startTimerButton.addEventListener('click', function () {
  buttonClick.play();
  getCountDownDate();
});

// sets timer length
pomodoroTimerButton.addEventListener('click', function () {
  desiredMinutes = 25;
  timerDisplay.innerHTML = "25:00"
});
shortBreakButton.addEventListener('click', function () {
  desiredMinutes = 5;
  timerDisplay.innerHTML = "05:00"
});
longBreakButton.addEventListener('click', function () {
  desiredMinutes = 15;
  timerDisplay.innerHTML = "15:00"
});


playSoundButton.addEventListener('click', playSound)