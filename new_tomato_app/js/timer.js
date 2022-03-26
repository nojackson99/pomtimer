import Timer from "easytimer.js";

export const timerDisplay = document.getElementById("timer-display");       // timer display
export const timerContainer = document.getElementById("timer-container");   // timer container
export const startButton = document.getElementById("timer-start")           // start timer button

const timer = new Timer();

export function startTimer(length, e) {


    const lengthSeconds = (length * 60);

    buttonClick.play();

    const playButton = e.currentTarget;
    playButton.classList.add('hide');
    const pauseButton = document.getElementById("timer-pause");
    pauseButton.classList.remove('hide');

    timer.start({countdown: true, startValues: {seconds: lengthSeconds}});


    timer.addEventListener('secondsUpdated', function (e) {
        const minutes = timer.getTimeValues().minutes.toString();
        const seconds = timer.getTimeValues().seconds.toString();

        let currentTime;

        if(seconds < 10) {
            currentTime = minutes + ':0' + seconds;
        }else {
            currentTime = minutes + ':' + seconds;
        }

        

        $('#timer-display').html(currentTime);
    });

    pauseButton.addEventListener('click', function (e) {
        buttonClick.play();
        timer.pause();
        playButton.classList.remove('hide');
        playButton.innerHTML = "Resume";
        pauseButton.classList.add('hide');
    })
}

// -------------- SOUND VARIABLES -------------
var alyssaSound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
var buttonClick = new Audio('../misc_project_files/button_click.mp3');
var buttonClick2 = new Audio('../misc_project_files/button_click.mp3') // sound from zapsplat.com
var ringingBell = new Audio('/misc_project_files/ringing_bell.mp3')

// triggers audio file playback
function playSound() {
    alyssaSound.play();
  }