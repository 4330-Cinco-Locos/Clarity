
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
const auth = getAuth();
var isLoggedIn = false;

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

function isString(variable){
    return typeof variable === "string";
}

function add_login_button(){
    const topnav = document.getElementById('top-nav');
    const login_button = document.createElement('a');
    login_button.classList.add("profile");
    login_button.textContent = "Login";
    login_button.setAttribute("href", "../LoginLogoutUI/index.html");
    topnav.appendChild(login_button);
}

function add_profile_button(user){
    const topnav = document.getElementById('top-nav');

    const profile_button = document.createElement('a');
    profile_button.classList.add("profile");
    profile_button.textContent = user.displayName;
    profile_button.setAttribute("href", "../UserProfile/index.html");
    topnav.appendChild(profile_button);
}

onAuthStateChanged(auth, (user) => {
    
    if (user) {
        add_profile_button(user);   
        isLoggedIn = true;
    }
    else{
        add_login_button();
        isLoggedIn = false;
    }

})

document.addEventListener("DOMContentLoaded", () => {
    
    if(isLoggedIn){
        const reference = ref(db, `eventDB`);

        onValue(reference, (snapshot)=> {
            clear_container("immediate");
            const queueBox = document.querySelector('.queue-box');
            const label = document.createElement('h3');
            label.textContent = "Immediate Tasks (Priority 1)";
            queueBox.appendChild(label);

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
    }
    else
    {
        clear_container("immediate");

        const queueBox = document.querySelector('.queue-box');
        const label = document.createElement('h3');
        label.textContent = "Immediate Tasks (Priority 1)";
        queueBox.appendChild(label);

        const login_notif = document.createElement('div');
        login_notif.textContent = "Warning: you must be logged in to view task content";
        login_notif.classList.add('Warning');
        login_notif.id = 'Warning';
        queueBox.appendChild(login_notif);
    }
})

function addTask(event, key){

    const queueBox = document.querySelector('.queue-box');
    const task = document.createElement('div');

    task.classList.add('task');
    task.id = key;
    task.innerHTML = `<div class="task-title">${event.title}</div>`;

    queueBox.appendChild(task);

}


