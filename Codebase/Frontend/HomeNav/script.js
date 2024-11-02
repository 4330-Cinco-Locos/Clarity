console.log("Script loaded");
const toggleBtn = document.querySelector('.toggle_button');
const toggleBtnIco = document.querySelector('.toggle_button i');
const dropdownM = document.querySelector('.dropdown');
const signOutBtn = document.querySelector('.act_btn');
let isSignedIn = false;


function updateButtonText() {
    signOutBtn.textContent = isSignedIn ? 'Sign Out' : 'Sign In'; // change text based on state
}
updateButtonText();

// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// this is just to test functionality, still needs integration with firebase auth
signOutBtn.addEventListener('click', function() {
    console.log("button clicked")
    isSignedIn = !isSignedIn; // toggle the sign-in state
    updateButtonText(); // update button text based on the new state
});
