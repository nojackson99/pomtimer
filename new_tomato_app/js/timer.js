import Timer from "easytimer.js";

const timer = new Timer();

export function startTimer(length) {
    console.log(`newTimer called! length = ${length}`);
    const lengthSeconds = (length * 60);

    buttonClick.play();

    timer.start({countdown: true, startValues: {seconds: lengthSeconds}});

    timer.addEventListener('secondsUpdated', function (e) {
        console.log('updating seconds')

        const minutes = timer.getTimeValues().minutes.toString();
        const seconds = timer.getTimeValues().seconds.toString();
        const currentTime = minutes + ':' + seconds;

        $('#timer-display').html(currentTime);
    });

}

// -------------- SOUND VARIABLES -------------
var alyssaSound = new Audio('/misc_project_files/alyssa_timer_end.mp3')
var buttonClick = new Audio('../misc_project_files/button_click.mp3');
var buttonClick2 = new Audio('../misc_project_files/button_click.mp3') // sound from zapsplat.com
var ringingBell = new Audio('/misc_project_files/ringing_bell.mp3')