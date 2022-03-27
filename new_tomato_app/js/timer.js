import Timer from "easytimer.js";   // import timer managment objects and function from easytimer.js library

export const timerDisplay = document.getElementById("timer-display");       // timer display
export const timerContainer = document.getElementById("timer-container");   // timer container
export const startButton = document.getElementById("timer-start")           // start timer button
const pauseButton = document.getElementById("timer-pause");                 // pause state for play/pause button

// create new easytimer.js timer object;
export var timer = new Timer();

// resets timer when switching themes
export function resetTimer() {
    timer.pause();
    timer.reset();
}

// starts new timer at given length
export function startTimer(lengthInMinutes) {

    // resume timer if paused
    if(timer.isPaused() == true) {
        buttonClick.play();
        timer.start();

        // change play/pause button to pause state
        startButton.classList.add('hide');
        pauseButton.classList.remove('hide');

    }
    // runs on first call of startTimer 
    else {
        // calculates correct timer length
        const lengthInSeconds = (lengthInMinutes * 60);

        buttonClick.play();

        // change play/pause button to pause state
        startButton.classList.add('hide');    
        pauseButton.classList.remove('hide');

        // starts countdown timer with length set to lenghtInSeconds
        timer.start({countdown: true, startValues: {seconds: lengthInSeconds}});

        // Updates timer display every second
        timer.addEventListener('secondsUpdated', function () {

            // get minutes and seconds for timer object
            const minutes = timer.getTimeValues().minutes.toString();
            const seconds = timer.getTimeValues().seconds.toString();

            // string holding time left of timer object for display purposes
            let currentTime;

            // if seconds is below 10 adds a '0' to currentTime to ensure proper display
            if(seconds < 10) {
                currentTime = minutes + ':0' + seconds;
            }else {
                currentTime = minutes + ':' + seconds;
            }

            // updates timer dsiplay with time left on timer
            $('#timer-display').html(currentTime);
    });
    }
}

// -------------- SOUND VARIABLES -------------
var alyssaSound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
var buttonClick = new Audio('../misc_project_files/button_click.mp3'); // sound from zapsplat.com
var ringingBell = new Audio('/misc_project_files/ringing_bell.mp3')

// pause timer and change play/pause button to resume state
pauseButton.addEventListener('click', function () {
    buttonClick.play();     // play button click feedback
    timer.pause();          // pause timer

    // change  play/pause button to resume state
    startButton.classList.remove('hide');
    pauseButton.classList.add('hide');
    startButton.innerHTML = "Resume";
})