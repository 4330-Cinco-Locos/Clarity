// Find HTML calendar element
var calendarElement = document.getElementById('calendar');

// Create new instance of a Calendar object
var calendarInstance = new calendarJs(calendarElement, {
  exportEventsEnabled: false,
  manualEditingEnabled: false,
  useAmPmForTimeDisplays: true
});

// Asynchronous function to import events into the Calendar from Firebase
async function getEvents() {
  const url = 'https://clarity-295d8-default-rtdb.firebaseio.com/eventDB_2.json';
  try {
    const response = await fetch(url); // Make HTTP request to URL, await the response
    if (!response.ok) { // If the response status isn't OK (200), throw an error containing the actual status
      throw new Error('HTTP Status ' + response.status + ', ' + response.statusText);
    }
    const data = await response.json(); // Upon fetch success, parse the response data as a JSON object

    console.log(data); // Debug
    console.log(JSON.stringify(data)); // Debug
    
    calendarInstance.addEventsFromJson(data); // Set calendar events using the newly acquired JSON
  } catch (error) { // Send error message to the browser console
    console.error(error.message);
  }
}

getEvents();