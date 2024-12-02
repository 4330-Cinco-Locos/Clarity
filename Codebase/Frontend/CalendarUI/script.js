import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, ref, child, get, push, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

// Wait for Modal input fields to load
document.addEventListener("DOMContentLoaded", () => {
    taskNameInput = document.getElementById('taskName');
    attributeInput = document.getElementById('attribute');
    dateDueInput = document.getElementById('dateDue');
    prioritySelect = document.getElementById('priority');
    modalOverlay = document.getElementById('modalOverlay');
});

// Open the Modal (by unhiding it) & clearing all entry fields
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

// Close the Modal (by hiding it)
window.closeModal = function() {
    modalOverlay.style.display = 'none';
    currentTask = null;
}

// Save task, update Firebase, & close the Modal
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

// Main loader for the Calendar
document.addEventListener('DOMContentLoaded', function() {
  var event_data = new Array();
  
  const dbRef = ref(getDatabase());
  get(child(dbRef, "eventDB/")).then((snapshot) => {
    if (snapshot.exists()) {
      const raw_data = snapshot.val();
      for (var key in raw_data) { 
        var temp_start = (raw_data[key])["start"];
        var temp_end = (raw_data[key])["end"];
        var temp_desc = (raw_data[key])["attribute"];
        if (temp_start.startsWith('T') || temp_start == "") {
          temp_start = (new Date().toISOString()).substring(0, 19);
        } 
        if (temp_end.startsWith('T') || temp_end == "") {
          temp_end = (new Date().toISOString()).substring(0, 19);
        } else if (!temp_end.includes('T')) {
          temp_end += "T23:59:00";
        }
        if (temp_desc == "" || temp_desc == " ") {
          temp_desc = "No description.";
        }
        event_data.push({
          title : (raw_data[key])["title"],
          start : temp_start,
          end : temp_end,
          description : temp_desc
        });
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  console.log(event_data); // For debugging purposes, disable before release

  var calendarEl = document.getElementById('calendar'); // Get 'calendar' object from page

  var calendar = new FullCalendar.Calendar(calendarEl, { // Instance new calendar object
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    dayMaxEvents: true,
    navLinks: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    footerToolbar: {
      center: 'addTaskButton',
    },
    customButtons: {
      addTaskButton: {
        text: 'Add a new task...',
        click: function () {
          openModal();
        }
      }
    },
    eventDidMount: function (info) { // On hover, have an event show a pop-up w/ description
      var tooltip = new bootstrap.Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    },
    eventColor: '#d9ae89',
    eventSources: [event_data]
  });
  calendar.render(); // Display the calendar on the page
  console.log(calendar.getEventSources()); // For debugging purposes, disable before release
});