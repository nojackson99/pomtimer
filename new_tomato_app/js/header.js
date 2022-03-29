const newProfileButton = document.querySelector("#create-new-profile")
const profileModal = document.querySelector("#new-profile-modal")
const closeProfileModal = document.querySelector("#close-profile-modal")

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