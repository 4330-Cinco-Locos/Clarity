console.log("script.js is running");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// grabbing the needed database methods
import {getAuth, updatePassword, onAuthStateChanged, updateProfile} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"

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

const uploadImageBtn = document.querySelector('.image_upload_btn');
const uploadBtn = document.querySelector('.upload');
const closeUploadBtn = document.querySelector('.close_upload');

const closeMissmatchBtn = document.querySelector('#close_missmatch_popup');
const closeSucessfulBtn = document.querySelector('#close_sucessful_popup');

const newPassword = document.getElementById('password1');
const newPasswordCheck = document.getElementById('password2');
const newURL = document.getElementById('url');


// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

function add_profile_button(user){
    const topnav = document.getElementById('top-nav');

    const profile_button = document.createElement('a');
    profile_button.classList.add("profile");
    profile_button.textContent = user.displayName;
    profile_button.setAttribute("href", "../UserProfile/index.html");
    topnav.appendChild(profile_button);
}

onAuthStateChanged(auth, (user) => {
    
    const passwordButton = document.querySelector('.passwdbtn');
    const photoUploadButton = document.querySelector('.image_upload_btn');

    if (user) {
        passwordButton.style.display = "block";
        photoUploadButton.style.display = "block";
        add_profile_button(user);
        getAdditionalUserInfo();

        
    }
    else{
        console.log("No user is signed in");
        passwordButton.style.display = "none";
        photoUploadButton.style.display = "none";
    }
})



function getAdditionalUserInfo(){

    const user = auth.currentUser;

    document.getElementById("name").innerHTML = user.displayName; //profile.name
    document.getElementById("ID").innerHTML = user.uid; //profile.uid
    document.getElementById("email").innerHTML = user.email; //profile.email

    const profileImage = user.photoURL || "https://static.thenounproject.com/png/4154905-200.png";
    document.getElementById("profile_img").src = profileImage;
    console.log(profileImage)

}

//show overlay if change password button is selected
uploadImageBtn.addEventListener('click', function(){

    document.getElementById("image_overlay").style.display = "block";

});

uploadBtn.addEventListener('click', function(){


    //update user profile url

    updateProfile(auth.currentUser, {
        photoURL: newURL.value
    }).then(( ) => {
        console.log('Profile Image Uploaded');
    }).catch((error) => {
        console.log('File was not Uploaded');
    })


    document.getElementById("image_overlay").style.display = "none";

});

closeUploadBtn.addEventListener('click', function(){

    document.getElementById("image_overlay").style.display = "none";

});

//update user's password when the 'save' button is selected
saveBtn.addEventListener('click', function(){

    const user = auth.currentUser;

       if (newPassword.value == newPasswordCheck.value ){

        if (newPassword.value.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        
        //show pupup for a sucessfully updated password
        document.getElementById("sucessful").style.display = "block";

        document.getElementById('password1').value = '';
        document.getElementById('password2').value = '';    

        updatePassword(user, newPassword.value).then(() => {
            
        }).catch((error) => {
            alert("Error updating password:");
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
