import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
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
const db = getDatabase(app);

let currentTask = null;
let taskNameInput, attributeInput, dateDueInput, prioritySelect, modalOverlay;

document.addEventListener("DOMContentLoaded", () => {
    taskNameInput = document.getElementById('taskName');
    attributeInput = document.getElementById('attribute');
    dateDueInput = document.getElementById('dateDue');
    prioritySelect = document.getElementById('priority');
    modalOverlay = document.getElementById('modalOverlay');
});

// Open and close modal
window.openModal = function(taskElement = null) {
    currentTask = taskElement;
    if (taskElement) {
        const taskId = taskElement.getAttribute('data-id');
        const taskRef = ref(db, `eventDB/${taskId}`);

        onValue(taskRef, (snapshot) => {
            const childData = snapshot.val();
            if (childData) {
                taskNameInput.value = childData.title;
                attributeInput.value = childData.attribute || "";
                dateDueInput.value = childData.dateDue || "";
                prioritySelect.value = childData.priority || "";
            }
        }, { onlyOnce: true });
    } else {
        // Clear modal fields for new task
        taskNameInput.value = "";
        attributeInput.value = "";
        dateDueInput.value = "";
        prioritySelect.value = "";
    }
    modalOverlay.style.display = 'flex';
}

window.closeModal = function() {
    modalOverlay.style.display = 'none';
    currentTask = null;
}

// Save task and update Firebase
window.saveTask = function() {
    const updatedName = taskNameInput.value.trim();
    const updatedAttribute = attributeInput.value.trim();
    const updatedDateDue = dateDueInput.value;
    const updatedPriority = prioritySelect.value;

    if (!updatedName) {
        alert("Task name is required.");
        return;
    }
    if (currentTask) {
        // Update existing task
        const taskId = currentTask.getAttribute('data-id');
        const taskRef = ref(db, `eventDB/${taskId}`);
        update(taskRef, {
            title: updatedName,
            attribute: updatedAttribute,
            dateDue: updatedDateDue,
            priority: parseInt(updatedPriority)
        }).then(() => {
            console.log("Task updated successfully in Firebase.");
        }).catch((error) => {
            console.error("Error updating task:", error);
        });
        currentTask.textContent = `${updatedName} (Priority: ${updatedPriority})`;
    } else {
        // Create new task
        const start = updatedDateDue + 'T09:00:00';
        const end = updatedDateDue + 'T17:00:00';
        const dateAdded = new Date().toISOString();
        const eventData = {
            title: updatedName,
            attribute: updatedAttribute,
            dateAdded,
            start,
            end,
            priority: parseInt(updatedPriority)
        };
        const eventRef = push(ref(db, 'eventDB/'));
        set(eventRef, eventData)
            .then(() => {
                console.log("Event saved successfully.");
            })
            .catch((error) => {
                console.error("Error saving event:", error);
            });
    }
    closeModal();
}