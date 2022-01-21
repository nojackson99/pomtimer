import './style.css'

// calculates countdown date and calls start timer function
function getCountDownDate() {

  const now = Date.now();           // calculates and sets current time
  let desiredMinutes = .1;          // will be changed depending on which timer button is pressed?
  const milliMultiplier = 60000;    // multiplier to convert minutes to milliseconds
  const calculationOffset = 1000;   // offsets calculation for correct timer
  
  // takes minutes and calculates to milliseconds for countdown timer function
  let cdTime = now + (desiredMinutes * milliMultiplier) + calculationOffset

  timerControl(cdTime)
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
    document.getElementById("timer-display").innerHTML = minutes + ":" + seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(timerLoop);
      document.getElementById("timer-display").innerHTML = "Session over +1 tomato";
      playSound();
    }
  }, 1000);
}

// triggers audio file playback
function playSound() {
  var sound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
  sound.play();
}

// set start time button to variable
const startTimerButton = document.getElementById("timer-start");

const playSoundButton = document.getElementById("test-button");

// starts timer function when start focus button is pressed
startTimerButton.addEventListener('click', function () {
  getCountDownDate();
});

playSoundButton.addEventListener('click', playSound)