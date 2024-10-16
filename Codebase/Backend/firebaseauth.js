  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
    authDomain: "clarity-295d8.firebaseapp.com",
    projectId: "clarity-295d8",
    storageBucket: "clarity-295d8.appspot.com",
    messagingSenderId: "117186684063",
    appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //input fields
  document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById('create-email').value;
    const username = document.getElementById('create-username').value;
    const password = document.getElementById('create-password').value;
});

  //login/create acct button function
  const createSubmit = document.getElementById('create-submit');
  createSubmit.addEventListener('click', function(event){
    event.preventDefault();
    alert(5);
  })
  