// -------------- timer.js --------------------
// Holds code associated with controlling timer function
// --------------------------------------------
// [X] todo: create timer reset funciton to stop and reset timer when theme is changed
// [X] todo: create functionality for timer completion
// [] todo: add funtionality so session does not increment when user changes theme manually

import Timer from "easytimer.js";   // import timer managment objects and functions from easytimer.js library
import * as Theme from './theme.js';

export const timerDisplay = document.getElementById("timer-display");       // timer display
export const timerContainer = document.getElementById("timer-container");   // timer container
export const startButton = document.getElementById("timer-start")           // start timer button
export let timerStarted = false;                                            // tracks if a timer has been started
const pauseButton = document.getElementById("timer-pause");                 // pause state for play/pause button
let workSessionNumber = 0;                                                  // tracks work session current number
let longBreakInterval = 3;                                                  // tracks when to trigger a long break
export const activeTask = document.querySelector("#active-task")

// create new easytimer.js timer object;
export let timer = new Timer();

// resets timer as needed
export function resetTimer() {
    // check if timer is currently running
    if(timer.isRunning()) {
        // change play/pause button to play state
        startButton.classList.remove('hide');
        pauseButton.classList.add('hide');
    }

    // stop timer and assign false to timerStarted
    timer.stop();
    timerStarted = false;
}

// starts new timer at given length
function startTimer(lengthInMinutes) {

    // resume timer if paused
    if(timer.isPaused()) {
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

        timerStarted = true;    // indicate that timer has been started

        //increment workSession number if pomodoro theme is active on timer start
        if (Theme.siteBody.classList.contains(`${Theme.pomTheme}`)) {
            workSessionNumber++;        // increment session number
            console.log(`Session number: ${workSessionNumber}`);   
        }
    }
}

// -------------- SOUND VARIABLES -------------
const alyssaSound = new Audio('../misc_project_files/sounds/alyssa_timer_end.mp3')
const buttonClick = new Audio('../misc_project_files/sounds/button_click.mp3'); // sound from zapsplat.com
const ringingBell = new Audio('../misc_project_files/sounds/ringing_bell.mp3')
const woodSound = new Audio('../misc_project_files/sounds/wood_end_timer.mp3')

// pause timer and change play/pause button to resume state
pauseButton.addEventListener('click', function () {
    buttonClick.play();     // play button click feedback
    timer.pause();          // pause timer

    // change play/pause button to resume state
    startButton.classList.remove('hide');
    pauseButton.classList.add('hide');
    startButton.innerText = "Resume";
})

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

// Sets behavior when timer finsihes
timer.addEventListener('targetAchieved', () => {
    // play end timer sound
    woodSound.play();

    // call funciton to update sessions completed on task if there is an active task
    if(!(activeTask.innerText === 'Active task shown here')) {
        Data.updateSessionsCurrent();
    }

    // check which type of session completed
    // if pomodoro session completed switch to appropriate break lengh
    if (Theme.siteBody.classList.contains(`${Theme.pomTheme}`)) 
    {
        // if enough work session have completed switch to long break
        if (workSessionNumber === longBreakInterval)  {
            // reset workSession counter
            workSessionNumber = 0;
            // switch theme to long break
            Theme.changeTheme(Theme.longBreak,Theme.longTheme);
        // switch theme to short break
        } else {
            Theme.changeTheme(Theme.shortBreak,Theme.shortTheme);
        }
    // if break session completed switch theme to pomodoro
    } else {
        Theme.changeTheme(Theme.workLength,Theme.pomTheme);
    }

    // change play/pause button to play state
    startButton.classList.remove('hide');
    pauseButton.classList.add('hide');

});

// starts the timer
startButton.addEventListener( 'click', () => {startTimer(Theme.desiredMinutes)} );