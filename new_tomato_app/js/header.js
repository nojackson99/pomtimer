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

newProfileButton.addEventListener('click', ()=> {
    console.log('clicked');
    profileModal.showModal();
})

closeProfileModal.addEventListener('click', ()=> {
    profileModal.close();
})

settingsButton.addEventListener('click', ()=> {
    console.log('clicked');
    settingsModal.showModal();
})

closeSettingsModal.addEventListener('click', ()=> {
    settingsModal.close();
})

export const dropdownContent = document.querySelector("#dropdown-content");

