console.log("script.js is running");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// grabbing the needed database methods
import {getAuth, updatePassword, onAuthStateChanged} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
    authDomain: "clarity-295d8.firebaseapp.com",
    databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
    projectId: "clarity-295d8",
    appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth();

const toggleBtn = document.querySelector('.toggle_button');
const toggleBtnIco = document.querySelector('.toggle_button i');
const dropdownM = document.querySelector('.dropdown');
const signOutBtn = document.querySelector('.act_btn');

const saveBtn = document.querySelector('.save');
const closeBtn = document.querySelector('.close');
const updatePasswordBtn = document.querySelector('.passwdbtn');

const closeMissmatchBtn = document.querySelector('#close_missmatch_popup');
const closeSucessfulBtn = document.querySelector('#close_sucessful_popup');

const newPassword = document.getElementById('password1');
const newPasswordCheck = document.getElementById('password2');


// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});


onAuthStateChanged(auth, (user) => {
    
    const passwordButton = document.querySelector('.passwdbtn');

    if (user) {
        getAdditionalUserInfo(user);
        passwordButton.style.display = "block";
    }
    else{
        console.log("No user is signed in");
        passwordButton.style.display = "none";
    }
})

function getAdditionalUserInfo(user){

    user.providerData.forEach((profile) => {
        document.getElementById("name").innerHTML = profile.displayName; //profile.name
        document.getElementById("ID").innerHTML = profile.uid; //profile.uid
        document.getElementById("email").innerHTML = profile.email; //profile.email

        const profileImage = profile.photoURL || '../../Backend/default.jpg';
        document.getElementById("profile_img").src = profileImage;
    })
}

//update user's password when the 'save' button is selected
saveBtn.addEventListener('click', function(){

    const user = auth.currentUser;

    if(!user) {
        console.log("No user is logged in");
        document.getElementById("password_overlay").style.display = "none";
    }

    else if (newPassword.value == newPasswordCheck.value ){
        
        //show pupup for a sucessfully updated password
        document.getElementById("sucessful").style.display = "block";

        document.getElementById('password1').value = '';
        document.getElementById('password2').value = '';    

        updatePassword(user, newPassword.value).then(() => {
            
        }).catch((error) => {
            // An error ocurred
            // ...
        });

    }
    else{
        //show pupup for a missmathced passwords
        document.getElementById("missmatched").style.display = "block";

    }

});

closeSucessfulBtn.addEventListener('click', function(){
    document.getElementById("sucessful").style.display = "none";
    document.getElementById("password_overlay").style.display = "none";
});

closeMissmatchBtn.addEventListener('click', function(){
    document.getElementById("missmatched").style.display = "none";
});

//show overlay if change password button is selected
updatePasswordBtn.addEventListener('click', function(){
    document.getElementById("password_overlay").style.display = "block";
});

//close the update password display
closeBtn.addEventListener('click', function(){
    document.getElementById("password_overlay").style.display = "none";
    document.getElementById('password1').value = '';
    document.getElementById('password2').value = '';
});
