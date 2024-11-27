import { getDatabase, set, get, update, remove, ref, child, onValue } from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../../Backend/firebaseauth.js" 

import { firebaseConfig } from "../../Backend/apiKey.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializing variables
const db = getDatabase();
const dbRef = ref(db, 'chat/');
const chanRef = ref(db, 'channels/');
const textField = document.getElementById("myText");  // whatever text the user has entered in the textbox
var userId = null;
var pfpElementSrc = null;
var channel = "General";
const valid_channels = ["General", "UI-Development", "Backend-Development"]

function isString(variable){
    return typeof variable === "string";
}

// this is the setter method for the userId var
onAuthStateChanged(auth, (user) => {
    if (user) { //is signed in
        // getting username
        if (user.displayName != null) 
            {
                userId = user.displayName;
            }
        else if (user.email != null) 
            {
                // you cant send an entry to firebase containing a '.' so, we have to break this string
                // so that we can send messages, sense the userId is part of msgId
                const tmp = user.email;
                const idx = tmp.indexOf("@");
                if (idx !== -1) {
                    const substring = tmp.substring(0, idx);
                    userId = substring;
                }
            }
        else if (user.uid != null) 
            {
                userId = user.uid;
            }
        // getting pfp
        const profilePicture = user.photoURL;
        if (profilePicture != null) pfpElementSrc = profilePicture;
        else
        {
            console.log("ERROR: User has no profile picture. Using default profile picture")
            // TODO: set pfpElementSrc to be the default
            pfpElementSrc = "./default.jpg"; //this does not function
        }
    }
    else
    {
        alert("Only Logged in users may view and send messages\n")
    }
  });

// clears an element with id div_name of all child elements
// div_name must be a string type
function clear_container(div_name)
{
    if (isString(div_name))
    {
        const msg_container = document.getElementById(div_name);

        // Check if the parent element has any children
        while (msg_container.firstChild) {
        // Remove the first child
        msg_container.removeChild(msg_container.firstChild);
        }
    }
    else console.log("ERROR: clear_container was passsed an invalid parameter ["+div_name+"]\n");
}

// This will read all entries from firebase and add them to the message container
onValue(dbRef,(snapshot) =>{
    clear_container("content");
    if(userId != null)
    {
        //console.log("[DEBUG] current user: "+userId);
        snapshot.forEach(function(childSnapshot)
        {
            const childData = childSnapshot.val();
            if (childData.channel == channel)
            {
                //the main message container
                const newMessage = document.createElement("p");
                newMessage.classList.add("message");

                //making the message text-elements
                const textElements = document.createElement("div");
                textElements.classList.add("textElements");

                const senderElement = document.createElement("p");
                senderElement.classList.add("sender");
                senderElement.textContent = childData.senderId;

                const bodyElement = document.createElement("p");
                bodyElement.classList.add("body");
                bodyElement.textContent = childData.body;

                const timeElement = document.createElement("p");
                timeElement.classList.add("time");
                timeElement.textContent = childData.timeStamp.toString();

                textElements.appendChild(senderElement);
                textElements.appendChild(bodyElement);
                textElements.appendChild(timeElement);

                //making the image element
                const imgElement = document.createElement("img");
                imgElement.classList.add("profile-picture")
                imgElement.src = childData.imageUrl;
                imgElement.alt = "image"

                newMessage.appendChild(imgElement);
                newMessage.appendChild(textElements);
                document.getElementById("content").appendChild(newMessage);
            }
        });
    }
    else alert("Only Logged In Users may view messages!\n");
}, (errorObject) => {
    console.log('The read failed: '+ errorObject.name)
});

function changeChannel(newChannel)
{
    const refreshChatRef = ref(db, "chat/refresher");
    channel = newChannel;
    // Temporarily modify the data, just to trigger the listener
    set(refreshChatRef, {refresh: true})
    .then(() => {
        // Optionally reset data after a short delay
      setTimeout(() => set(refreshChatRef, {}), 1000); // Clear after 1 second
    })
    .catch((error) => console.error("Error triggering listener:", error));
}


// This will read all the entries from the valid-channels section & place them in the sidenav appropriately
onValue(chanRef, (snapshot) =>
{
    const sideNav = document.getElementById("channels-list");
    clear_container("channels-list")
    const Label = document.createElement("p");
    Label.textContent = "Channel List:"
    sideNav.appendChild(Label);
    
    
    if (userId != null)
    {
        snapshot.forEach(function(childSnapshot)
        {
            const childData = childSnapshot.val();
            const channelBtn = document.createElement("button");
            channelBtn.textContent = childData.name;
            sideNav.appendChild(channelBtn);

            channelBtn.addEventListener('click', function(){
                alert("changing channel to "+childData.name)
                changeChannel(childData.name);
            })
        });
    }
})

//CRUD methods
function sendData() // Create a new entry on the database
{
    if(userId != null)
    {
        var time = new Date().toUTCString();
        var msgId = userId+time;
        set(ref(db, "chat/"+msgId), {
            senderId: userId,
            body: textField.value, //have to grab the values IN the element, not the element itself
            imageUrl: pfpElementSrc,
            channel: channel,
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
    if (event.key === 'Enter') {
        if(userId == null) alert("Only Logged In users may view messages!\n[DEBUG]: current userID: "+userId);
        else
        {
        sendData();
        textField.value = "";
        }
    }
});

//fileBtn.addEventListener('click', function(){fileInput.click()});
//fileInput.addEventListener('change', function(){handleFileSelect(event)});