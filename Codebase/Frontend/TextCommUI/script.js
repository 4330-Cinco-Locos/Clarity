import {getDatabase, set, get, update, remove, ref, child, onValue} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../../Backend/firebaseauth.js" 

import { firebaseConfig } from "../../Backend/apiKey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializing variables
const db = getDatabase();
const dbRef = ref(db, 'chat/');
const textField = document.getElementById("myText");  // whatever text the user has entered in the textbox
var userId = "";
var imgUrl = ""; // TODO: set dynamically, pull from user var

// this is the setter method for the userId var
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        //console.log("[DEBUG] user is signed in!\nGrabbing identification details");
        //console.log("[DEBUG] checking for displayName value")
        if (user.displayName != null) 
            {
                userId = user.displayName;
                //console.log("[DEBUG] userId set: "+userId);
                return;
            }
        //console.log("[DEBUG] displayName not found, checking for email value.\n");
        if (user.email != null) 
            {
                // you cant send an entry to firebase containing a '.' so, we have to break this string
                // so that we can send messages, sense the userId is part of msgId
                const tmp = user.email;
                const idx = tmp.indexOf("@");
                if (idx !== -1) {
                    const substring = tmp.substring(0, idx);
                    userId = substring;
                }
                //console.log("[DEBUG] userId set: "+userId);
                return;
            }
        //console.log("[DEBUG] email not found, checking for uid value.\n");
        if (user.uid != null) 
            {
                userId = user.uid;
                //console.log("[DEBUG] userId set: "+userId);
                return;
            }   
    }
    else
    {
        alert("Only Logged in users may view and send messages\n")
    }
  });
  
// This will read all entries from firebase and add them to the message container
    onValue(dbRef,(snapshot) =>{
        if(userId == "") alert("Only Logged In users may view messages!\n[DEBUG]: current userID: "+userId);;
        snapshot.forEach(function(childSnapshot)
        {
            const childData = childSnapshot.val();
            const storedId = childData.senderId

            //making the main message container
            const newMessage = document.createElement("div");
            newMessage.classList.add("message");

            //making the message sub-elements
            const senderElement = document.createElement("div");
            senderElement.classList.add("sender");
            senderElement.textContent = childData.senderId;

            const bodyElement = document.createElement("div");
            bodyElement.classList.add("body");
            bodyElement.textContent = childData.body;

            const timeElement = document.createElement("div");
            timeElement.classList.add("time");
            timeElement.textContent = childData.timeStamp.toString();

            newMessage.appendChild(senderElement);
            newMessage.appendChild(bodyElement);
            newMessage.appendChild(timeElement);

            document.getElementById("content").appendChild(newMessage);
        });
    }, (errorObject) => {
        console.log('The read failed: '+ errorObject.name)
    });




//CRUD methods
function sendData() // Create a new entry on the database
{
    if(userId != "")
    {
        var time = new Date().toUTCString();
        var msgId = userId+time;
        set(ref(db, "chat/"+msgId), {
            senderId: userId,
            body: textField.value, //have to grab the values IN the element, not the element itself
            imageUrl: imgUrl, //this will also need a .value once it is properly implemented
            timeStamp: time
        })
        .catch((error)=>{
            alert(error)
        })
    }
    else
    {
        alert("Users who are not logged in may not send messages!\n");
        console.log("Users who are not logged in may not send messages!\n");
    }
}

// this might need to be deleted later as it doesn't really have much of a use? //
function getData() // Read entries from the database
{
    // NOTE: there may be a way to do this without having to iterate through the whole db everytime
    // If possible, implement this version instead, as iterating through the whole db will get very
    // slow as the db scales up

    // read through each entry in the db
        // if the message's senderId == userId, display it as a user message element
        // else display it as an other message element

}

function updateData() // Update an entry in the database
{
    // called when an edit button is clicked on an individual message
    
    // pull the username and timestamp to get the msgId

    // push the message's text into the text box and wait for user editing

    // when the user hits submit, edit the entry in the db
}

function deleteData() // Delete an entry from the database
{
    // called when a delete button is clicked on an individual message

    // pull the username and timestamp to get the msgId

    // delete the message from the db

}

// file button stuff
const fileBtn = document.getElementById('file-button');
const fileInput = document.getElementById('file-input');
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        alert('File selected: ' + file.name);
    }
}

//event listeners
textField.addEventListener('keydown', function(event) {
    if(userId == "") alert("Only Logged In users may view messages!\n[DEBUG]: current userID: "+userId);;
    if (event.key === 'Enter') {
        sendData();
        textField.value = "";
    }
});

//fileBtn.addEventListener('click', function(){fileInput.click()});
//fileInput.addEventListener('change', function(){handleFileSelect(event)});