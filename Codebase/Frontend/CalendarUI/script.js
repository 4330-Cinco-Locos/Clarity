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
  console.log(input); // Debug
  var events = new Array();
  for (var key in input) {
    events.push(input[key]);
  }
  return events;
}

;(async () => { // IIFE used in order to use await at the top level
  const JSON_data = await getJSON(); // Await response before storing JSON data
  const event_data = parseJSON(JSON_data); // Parse JSON data for events
  console.log(event_data); // Debug

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
      events: event_data
    });
    
    calendar.render(); // Display the calendar on the page
  });

})();