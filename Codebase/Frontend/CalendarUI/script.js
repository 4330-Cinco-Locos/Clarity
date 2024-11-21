const firebaseConfig = {
  apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
  authDomain: "clarity-295d8.firebaseapp.com",
  databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
  projectId: "clarity-295d8",
  storageBucket: "clarity-295d8.firebasestorage.app",
  messagingSenderId: "117186684063",
  appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Event listener for activating the FullCalendar library upon page load
document.addEventListener('DOMContentLoaded', function() {
  // Find HTML calendar element
  var calendarEl = document.getElementById('calendar');
  
  // Instance new calendar object
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
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
    },
    eventSources: [
      {
        id: 1,
        url: 'https://clarity-295d8-default-rtdb.firebaseio.com/eventDB.json',
        method: 'GET',
        format: 'json',
        failure: function() {
          alert('There was an error while fetching events!');
        }
      }
    ]
  });
  
  calendar.render(); // Display the calendar on the page
});