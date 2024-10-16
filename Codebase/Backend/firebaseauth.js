  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { firebaseConfig } from "./apiKey.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  //input fields
  document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById('create-email').value;
    const username = document.getElementById('create-username').value;
    const password = document.getElementById('create-password').value;
  });

  //create acct button function
  const createSubmit = document.getElementById('create-submit');
  createSubmit.addEventListener('click', function(event){
    event.preventDefault();
    alert(5);
  })
  //login button function
  
  const loginSubmit = document.getElementById('login-submit');
  loginSubmit.addEventListener('click', function(event){
    event.preventDefault();
    alert(10);
  })
