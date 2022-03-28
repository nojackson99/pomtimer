// [] todo: break away as much code from main into modules
// -------------- IMPORTS ---------------------
import '../style.css';
import * as Tasks from './tasks.js';      //task associated code
import * as MyTimer from './timer.js';    //timer associated code
import * as Theme from './theme.js';      //theme associated code


// -------------- EVENT LISTENERS -------------
// starts the timer
MyTimer.startButton.addEventListener( 'click', () => {
  console.log(`calling startTimer`)
  MyTimer.startTimer(Theme.desiredMinutes)} );
// control adding new tasks, editing and deleting
Tasks.form.addEventListener('submit', Tasks.newTask );

