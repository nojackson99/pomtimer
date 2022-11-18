//----------------------------------------------------header.js----------------------------------------------------
// The code in this file controls the profile and settings buttons at the top of the page.
// Hoevering over profile menu opens the dropdown which allows for switching profiles and creating a new profile.
// Clicking create new profile opens profile modal which contains a form to submit new profile data.
// Clicking settings opens settings modal which contains a form to submit settings changes
//-----------------------------------------------------------------------------------------------------------------

// -------------- IMPORTS ---------------------
import * as Data from './data.js'; // data associated code
import * as Theme from './theme.js'; // theme associated code

// -------------- PROFILE ---------------------
// profile html elements
export const newProfileButton = document.querySelector('#create-new-profile');
export const profileModal = document.querySelector('#new-profile-modal');
export const closeProfileModal = document.querySelector('#close-profile-modal');

// profile dropdown list
export const dropdownContent = document.querySelector('#dropdown-content');

// new profile form elements
export const newProfileFirstName = document.querySelector(
  '#new-profile-first-name'
);
export const newProfileLastName = document.querySelector(
  '#new-profile-last-name'
);
export const newProfileUsername = document.querySelector(
  '#new-profile-username'
);
export const newProfileSubmit = document.querySelector('#new-profile-submit');

// open new profile modal
newProfileButton.addEventListener('click', () => {
  profileModal.showModal();
});

// close new profile modal
closeProfileModal.addEventListener('click', () => {
  profileModal.close();
});

// add new profile to profilesArray
newProfileSubmit.addEventListener('click', () => {
  // get values from new profile form
  const fName = newProfileFirstName.value;
  const lName = newProfileLastName.value;
  const uName = newProfileUsername.value;

  // call funciton to create new profile
  Data.newProfileSubmit(fName, lName, uName);
});

// -------------- SETTINGS --------------------
// settings html elements
const settingsButton = document.querySelector('#settings-button');
const settingsModal = document.querySelector('#settings-modal');
const closeSettingsModal = document.querySelector('#close-settings-modal');

// session interval form elements
const pomodoroLength = document.querySelector('#pomodoro-length');
const shortBreak = document.querySelector('#settings-short-break');
const longBreak = document.querySelector('#settings-long-break');
const settingsSubmit = document.querySelector('#settings-submit');

// open settings profile modal
settingsButton.addEventListener('click', () => {
  // populate form values with current session lengths
  pomodoroLength.value = Theme.sessionLengths.pomodoro;
  shortBreak.value = Theme.sessionLengths.shortBreak;
  longBreak.value = Theme.sessionLengths.longBreak;

  settingsModal.showModal();
});

// close settings profile modal
closeSettingsModal.addEventListener('click', () => {
  settingsModal.close();
});

// confirm settings changes
settingsSubmit.addEventListener('click', () => {
  const pom = pomodoroLength.value;
  const short = shortBreak.value;
  const long = longBreak.value;

  // call function to update session lengths
  Theme.updateSessionLengths(pom, short, long);
});
