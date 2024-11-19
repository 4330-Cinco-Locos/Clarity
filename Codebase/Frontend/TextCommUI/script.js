
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

// grabbing the needed database methods
import {getDatabase, set, get, update, remove, ref, child, onValue} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

// initializing variables
const db = getDatabase();
const dbRef = ref(db, 'chat/');
var text = document.getElementById("myText")  // whatever text the user has entered in the textbox
var submitBtn = document.getElementById("sendBtn")
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
        if (storedId.localeCompare(userId) == 0)
        {
            newMessage.classList.add("my-messages");
        }
        else 
        {
            newMessage.classList.add("other-messages");
        }
        newMessage.classList.add("message");

        //making the message sub-elements
        const senderElement = document.createElement("div");
        senderElement.classList.add("message-sender");
        senderElement.textContent = childData.senderId; //TODO: Figure out why this does not correctly display

        const bodyElement = document.createElement("div");
        bodyElement.classList.add("message-body");
        bodyElement.textContent = childData.body;

        const timeElement = document.createElement("div");
        timeElement.classList.add("time");
        timeElement.textContent = childData.timeStamp.toString();

        newMessage.appendChild(senderElement);
        newMessage.appendChild(bodyElement);
        newMessage.appendChild(timeElement);

        document.getElementById("messages").appendChild(newMessage);
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
    body: text.value, //have to grab the values IN the element, not the element itself
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

//event listeners
submitBtn.addEventListener('click', function(){sendData();}, false); //sendData() has to be wrapped this way to prevent it from activating on page load