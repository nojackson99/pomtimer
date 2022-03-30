import * as Theme from './theme.js'
import * as MyTimer from './timer'

export const newProfileButton = document.querySelector("#create-new-profile")
export const profileModal = document.querySelector("#new-profile-modal")
export const closeProfileModal = document.querySelector("#close-profile-modal")
export const newProfileFirstName = document.querySelector("#new-profile-first-name")
export const newProfileLastName = document.querySelector("#new-profile-last-name");
export const newProfileUsername = document.querySelector("#new-profile-username");
export const newProfileSubmit = document.querySelector("#new-profile-submit");
const settingsButton = document.querySelector("#settings-button")
const settingsModal = document.querySelector("#settings-modal")
const closeSettingsModal = document.querySelector("#close-settings-modal") 
const settingsSubmit = document.querySelector("#settings-submit");

const pomodoroLength = document.querySelector("#pomodoro-length")
const shortBreak = document.querySelector("#settings-short-break")
const longBreak = document.querySelector("#settings-long-break");

newProfileButton.addEventListener('click', ()=> {
    profileModal.showModal();
})

closeProfileModal.addEventListener('click', ()=> {
    profileModal.close();
})

settingsButton.addEventListener('click', ()=> {
    pomodoroLength.value = Theme.workLength;
    shortBreak.value = Theme.shortBreak;
    longBreak.value = Theme.longBreak;

    settingsModal.showModal();
})

closeSettingsModal.addEventListener('click', ()=> {
    settingsModal.close();
})

settingsSubmit.addEventListener('click', ()=> {
    const pom = pomodoroLength.value;
    const short = shortBreak.value;
    const long = longBreak.value;

    Theme.updateSessionLengths(pom,short,long);


})

// add new profile to profilesArray
newProfileSubmit.addEventListener('click', ()=> {
    const fName = Header.newProfileFirstName.value;
    const lName = Header.newProfileLastName.value;
    const uName = Header.newProfileUsername.value;
    Data.newProfileSubmit(fName,lName,uName)
});

export const dropdownContent = document.querySelector("#dropdown-content");

