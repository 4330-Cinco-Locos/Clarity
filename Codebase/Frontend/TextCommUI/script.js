import {getDatabase, set, get, update, remove, ref, child, onValue} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const firebaseConfig = {
apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
authDomain: "clarity-295d8.firebaseapp.com",
databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
projectId: "clarity-295d8",
storageBucket: "clarity-295d8.firebasestorage.app",
messagingSenderId: "117186684063",
appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializing variables
const db = getDatabase();
const dbRef = ref(db, 'chat/');
const textField = document.getElementById("myText")  // whatever text the user has entered in the textbox
var userId = "Lane" // TODO: set dynamically
var imgUrl = "" // TODO: set dynamically

// This will read all entries from firebase and add them to the message container
onValue(dbRef,(snapshot) =>{

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
var time = new Date().toUTCString();
var msgId = userId+time;
set(ref(db, "chat/"+msgId), {
    senderId: userId,
    body: textField.value, //have to grab the values IN the element, not the element itself
    imageUrl: imgUrl, //this will also need a .value once it is properly implemented
    timeStamp: time
})
.then(()=>{
    alert("Message sent")
})
.catch((error)=>{
    alert(error)
})
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
    if (event.key === 'Enter') {
        sendData();
    }
});

fileBtn.addEventListener('click', function(){fileInput.click()});
fileInput.addEventListener('change', function(){handleFileSelect(event)});