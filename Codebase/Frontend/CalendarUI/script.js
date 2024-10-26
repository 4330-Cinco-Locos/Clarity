document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
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
            var date = new Date(dateStr + 'T00:00:00') // using JS Date object

            if (!isNaN(date.valueOf())) { // check for valid date before adding
              calendar.addEvent({ // addEvent() works locally, it doesn't add to the DB
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
      events: [ // set of demo events to show off functionality
        {
          title: 'All Day Event',
          start: '2024-10-01',
        },
        {
          title: 'Long Event',
          start: '2024-10-07',
          end: '2024-10-10'
        },
        {
          title: 'Meeting 1',
          start: '2024-10-21T10:30:00',
          end: '2024-10-21T12:30:00'
        },
        {
          title: 'Meeting on Zoom',
          url: 'https://zoom.us/',
          start: '2024-10-23T14:30:00',
          end: '2024-10-23T16:30:00'
        },
        {
          title: 'Task Due',
          start: '2024-10-26T12:00:00',
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2024-10-04T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2024-10-11T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2024-10-18T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2024-10-25T16:00:00'
        }
      ]
    });
    
    calendar.render();
});