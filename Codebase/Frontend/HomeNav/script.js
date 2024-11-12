import { onAuthStateChanged, auth } from "../../Backend/firebaseauth.js";

const toggleBtn = document.querySelector('.toggle_button');
const toggleBtnIco = document.querySelector('.toggle_button i');
const dropdownM = document.querySelector('.dropdown');
const signOutBtn = document.querySelector('.act_btn');

// Track the user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in

        // Example: Log the current user UID to console
        console.log("Curr User UID: ", user.uid);

    } else {
        // User is signed out
        console.log("No user is signed in.");
    }
});
// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
