const newProfileButton = document.querySelector("#create-new-profile")
const openProfileModal = document.querySelector("#new-profile-modal")
const closeProfileModal = document.querySelector("#close-profile-modal")

const setttingsButton = document.querySelector("#settings-button")
// const 

newProfileButton.addEventListener('click', ()=> {
    console.log('clicked');
    openProfileModal.showModal();
})

closeProfileModal.addEventListener('click', ()=> {
    openProfileModal.close();
})