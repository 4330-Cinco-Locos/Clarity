console.log("script.js is running");


const toggleBtn = document.querySelector('.toggle_button');
const toggleBtnIco = document.querySelector('.toggle_button i');
const dropdownM = document.querySelector('.dropdown');
const signOutBtn = document.querySelector('.act_btn');

const saveBtn = document.querySelector('.save');
const closeBtn = document.querySelector('.close');
const updatePasswordBtn = document.querySelector('.passwdbtn');

const newPassword = document.getElementById('password1');
const newPasswordCheck = document.getElementById('password2');


// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

//update user's password when the 'save' button is selected
saveBtn.addEventListener('click', function(){

    if (newPassword.value == newPasswordCheck.value ){

        updatePassword(user, newPassword).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });

    }

});

//show overlay if change password button is selected
updatePasswordBtn.addEventListener('click', function(){
    document.getElementById("password_overlay").style.display = "block";
});

//close the update password display
closeBtn.addEventListener('click', function(){
    document.getElementById("password_overlay").style.display = "none";
});
