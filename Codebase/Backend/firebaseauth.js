  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { firebaseConfig } from "./apiKey.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //Auth interaction w/ firebase
  const auth = getAuth(app);

  //create acct button function
  const createSubmit = document.getElementById('create-submit');
  createSubmit.addEventListener('click', function(event){
    event.preventDefault();
    //input fields
    const email = document.getElementById('create-email').value;
    const password = document.getElementById('create-password').value;

    //email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //email regex check
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return; // Stop execution if email is invalid
    }
    //create acct - firebase interaction
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Creating Account..");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  })

  //login button function
  const loginSubmit = document.getElementById('login-submit');
  loginSubmit.addEventListener('click', function(event){
    event.preventDefault();
    //input fields
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    //email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    //email regex check
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return; // Stop execution if email is invalid
    }
    //login acct - firebase interaction
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signing In..");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  })

