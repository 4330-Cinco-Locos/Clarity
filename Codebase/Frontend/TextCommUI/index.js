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
import {getDatabase, set, get, update, remove, ref, child} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

// initializing variables
const db = getDatabase();
var text = document.getElementById("textId");  // whatever text the user has entered in the textbox
var submitBtn = document.getElementById("sendBtn");
var userId = "Lane" // TODO: set dynamically
var imgUrl = "" // TODO: set dynamically

//CRUD methods
function sendData()
{
  time = new Date().toUTCString();
  msgId = userId+time;
  set(ref(db, "chat/"+msgId), {
    senderId: userId,
    body: text.value,
    imageUrl: imgUrl,
    timeStamp: time
  })
  .then(()=>{
    alert("Message sent")
  })
  .catch((error)=>{
    alert(error)
  })
}

function getData()
{

}

function updateData()
{

}

function deleteData()
{

}

//event listeners
submitBtn.addEventListener('click', sendData);