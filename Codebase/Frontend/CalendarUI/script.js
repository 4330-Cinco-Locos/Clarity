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
  }
  else {
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
  reloadEvents();
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
  if (currentTask) { // Update existing task
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
  } 
  else { // Create new task
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

// Fetch data from Firebase in the form of JSON
async function getJSON() {
  const url = 'https://clarity-295d8-default-rtdb.firebaseio.com/eventDB.json';
  try {
    const response = await fetch(url); // Make HTTP request to URL, await the response
    if (!response.ok) { // If the response status isn't OK (200), throw an error containing the actual status
      throw new Error('HTTP Status ' + response.status + ', ' + response.statusText);
    }
    return response.json(); // Upon fetch success, parse the response data as a JSON object
  } catch (error) { // Send error message to the browser console
    console.error(error.message);
    return JSON.parse(""); // Return an empty JSON object upon failure
  }
}

// Parse JSON into an array of Calendar events
function parseJSON(input) {
  //console.log(input); // For debugging purposes, disable before release
  var events = new Array();
  for (var key in input) { 
    var temp_start = (input[key])["start"];
    var temp_end = (input[key])["end"];
    var temp_desc = (input[key])["attribute"];
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
    events.push({
      title : (input[key])["title"],
      start : temp_start,
      end : temp_end,
      description : temp_desc
    });
  }
  return events;
}

;(async () => { // IIFE used in order to use await at the top level
  const JSON_data = await getJSON(); // Await response before storing JSON data
  var event_data = parseJSON(JSON_data); // Parse JSON data for events
  //console.log(event_data); // For debugging purposes, disable before release
  var calendarEl = document.getElementById('calendar'); // Get 'calendar' object from page
  globalThis.calendar = new FullCalendar.Calendar(calendarEl, { // Instance new calendar object
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
    events: event_data, // Use event_data array
    eventColor: '#d9ae89'
  });
  calendar.render(); // Display the calendar on the page
  //console.log(calendar.getEventSources()); // For debugging purposes, disable before release

  // Reload events on the Calendar by removing & refetching them
  window.reloadEvents = async function () {
    var current_events = calendar.getEventSources(); // Get current calendar events
    //console.log(current_events); // For debugging purposes, disable before release
    (current_events[0]).remove(); // Remove events
    const raw_data = await getJSON(); // Await response before storing JSON data
    var new_data = parseJSON(raw_data); // Parse JSON data for events
    calendar.addEventSource(new_data); // Re-populate the calendar with events
  }
})();