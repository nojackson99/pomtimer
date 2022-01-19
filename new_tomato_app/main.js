import './style.css'

// calculates countdown date and calls start timer function
function getCountDownDate() {

  let now = Date.now();   // calculates and sets current time
  let minutes = 30;   // will be changed depending on which timer button is pressed?
  let milliMultiplier = 60000;    // multiplier to convert minutes to milliseconds
  let calculationOffset = 1000;   // offsets calculation for correct timer
  
  // takes minutes and calculates to milliseconds for countdown timer function
  let cdTime = now + (minutes * milliMultiplier) + calculationOffset

  timerControl(cdTime)
}

// starts timer to passed in count down date
function timerControl(countDownTime) {

  // Update the count down every 1 second
  let x = setInterval(function () {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownTime - now;

    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer-display").innerHTML = minutes + ":" + seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer-display").innerHTML = "EXPIRED";
    }
  }, 1000);
}

// set start time button to variable
const startTimerButton = document.getElementById("timer_start");

startTimerButton.addEventListener('click', function () {
  getCountDownDate();
});
