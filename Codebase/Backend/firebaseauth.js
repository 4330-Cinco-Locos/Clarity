  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { firebaseConfig } from "./apiKey.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //Auth interaction w/ firebase
  const auth = getAuth(app);

  export { onAuthStateChanged, auth }; // for auth tracking across other scripts
  document.addEventListener('DOMContentLoaded', function() {
    // create acct button function
    const createSubmit = document.getElementById('create-submit');
    
    if (createSubmit) {
      createSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        // input fields
        const email = document.getElementById('create-email').value;
        const password = document.getElementById('create-password').value;
        const username = document.getElementById('create-username').value;
  
        // email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        // email regex check
        if (!emailPattern.test(email)) {
          alert("Please enter a valid email address.");
          return; // Stop execution if email is invalid
        }
  
        // create account - Firebase interaction
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: username,
            })
            alert("Creating Account..");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      });
    } else {
      console.log("Create account button not found.");
    }
  });

// Login function
document.addEventListener('DOMContentLoaded', function() {
  const loginSubmit = document.getElementById('login-submit');
  
  if (loginSubmit) {
    loginSubmit.addEventListener('click', function(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Sign in - Firebase interaction
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Signing In, click ok to continue...");

          // Handle authentication state change
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, log the UID and redirect to HomeNav
              console.log("User UID:", user.uid);  // Log UID to console for debugging
              window.location.href = "../HomeNav/index.html";  // Redirect to HomeNav
            } else {
              // User is signed out, handle accordingly
              window.location.href = "../LoginLogoutUI/index.html";  // Redirect to Login
            }
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    });
  }
});
// sign out button function
const signOutButton = document.querySelector('#signoutbutton');

if (signOutButton) {  // Only add the event listener if the button exists
  signOutButton.addEventListener('click', function(event) {
    event.preventDefault();
    auth.signOut().then(() => {
      window.location.href = "../LoginLogoutUI/index.html";
      console.log("User signed out!");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  });
} else {
  console.log("Sign out button not found.");
}
// handle auth state globally
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If user is signed in, log the UID
    console.log("Current UID: ", user.uid);
    // You can also add code here to show the UID or set it in some global UI component
  } else {
    console.log("User is signed out.");
  }
});
