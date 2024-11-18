const firebaseConfig = {
  apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
  authDomain: "clarity-295d8.firebaseapp.com",
  databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
  projectId: "clarity-295d8",
  storageBucket: "clarity-295d8.firebasestorage.app",
  messagingSenderId: "117186684063",
  appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Initialize Firebase & Cloud Firestore; get a reference to Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Main function to work with FullCalendar
function fullCalendarMain() {
  // Get event data from Firestore (example code from Google)
  db.collection("eventDB").get().then((querySnapshot) => { 
    querySnapshot.forEach((doc) => { 
      console.log(`${doc.id} => ${doc.data()}`); 
    });
  });
  
  // Find HTML calendar element
  var calendarEl = document.getElementById('calendar');
  
  // Instance new calendar object
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    clickable: true,
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
        click: function() {
          var dateStr = prompt('Enter a date in the format of YYYY-MM-DD');
          var date = new Date(dateStr + 'T00:00:00') // Using JS Date object

          if (!isNaN(date.valueOf())) { // Check for valid date before adding
            calendar.addEvent({ // addEvent() works locally, it doesn't add to the DB (TODO: fix this)
              title: 'Demo Task (Dynamic)',
              start: date,
              allDay: true
            });
            alert('Task added!');
          } else {
            alert('Invalid date.');
          }
        }
      }
    }
  });
  
  calendar.render(); // Display the calendar on the page
}

// Event listener for activating the FullCalendar library upon page load
document.addEventListener('DOMContentLoaded', fullCalendarMain());