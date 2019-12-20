

var xhr = new XMLHttpRequest();                 // Create XMLHttpRequest object

xhr.onload = function() {                       // When readystate changes
  // The following conditional check will not work locally - only on a server
  if(xhr.status === 200) {                      // If server status was ok
    responseObject = JSON.parse(xhr.responseText); //JSON data from the server is stored in a variable called responseObject

    // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
    var newContent = '';
    for (var i = 0; i < responseObject.events.length; i++) { // Loop through object
      newContent += '<div class="event">';
      newContent += '<img src="' + responseObject.events[i].map + '" ';
      newContent += 'alt="' + responseObject.events[i].location + '" />';
      newContent += '<p><b>' + responseObject.events[i].location + '</b><br>';
      newContent += responseObject.events[i].date + '</p>';
      newContent += '</div>';
    }

    // Update the page with the new content
    document.getElementById('content').innerHTML = newContent;

  }
};

xhr.open('GET', 'resource/pieces.json', true);        // Prepare the request
xhr.send('');                                 // Send the request

// When working locally in Firefox, you may see an error saying that the JSON is not well-formed.
// This is because Firefox is not reading the correct MIME type (and it can safely be ignored).

// If you get it on a server, you may need to se the MIME type for JSON on the server (application/JSON).