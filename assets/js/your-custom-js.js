document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
  
        // Handle the response
        console.log(response);
        // Process the array of objects
        response.forEach(function(item) {
          // Access the properties of each object
          console.log(item.id);
          console.log(item.name);
          // Handle the data as needed
        });
      }
    };
  
    xhr.open('POST', ajaxurl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send('action=your_ajax_action');
  });
  