
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// grabbing the needed database methods
import {getAuth, updatePassword, onAuthStateChanged} from  "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
import { getDatabase, set, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
    authDomain: "clarity-295d8.firebaseapp.com",
    databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
    projectId: "clarity-295d8",
    storageBucket: "clarity-295d8.appspot.com",
    messagingSenderId: "117186684063",
    appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let currentTask = null;


const toggleBtn = document.querySelector('.toggle_button');
const toggleBtnIco = document.querySelector('.toggle_button i');
const dropdownM = document.querySelector('.dropdown');
const signOutBtn = document.querySelector('.act_btn');


// togglebtn is the bars dropdown icon
toggleBtn.addEventListener('click', function() {
    dropdownM.classList.toggle('open');
    const isOpen = dropdownM.classList.contains('open');
    toggleBtnIco.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

document.addEventListener("DOMContentLoaded", () => {
    
    const reference = ref(db, `eventDB`);

    onValue(reference, (snapshot)=> {
        const data = snapshot.val();

        for (const key in data) {
            if(data.hasOwnProperty(key)) {
                const event = data[key]

                if (event.priority == 1){
                    console.log(`Event key: ${key}, Event Date:`, event);
                    addTask(event, key);
                }

            }
        }

    })

})

function addTask(event, key){

    const queueBox = document.querySelector('.queue-box');
    const task = document.createElement('div');

    task.classList.add('task');
    task.id = key;
    task.innerHTML = `<div class="task">${event.attribute}</div>`;

    queueBox.appendChild(task);

}


