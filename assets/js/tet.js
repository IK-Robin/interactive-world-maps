document.addEventListener("DOMContentLoaded", function () {
    // ... Your existing code ...
    const  form = document.getElementById("rdata_from");
    let data = []; // Declare the data array outside the fetchAjaxRequest function
  // Add new data entry dynamically
  function displayDatabaseData(data) {
    const databaseData = document.getElementById("database-data");
    var html = "";
    data.forEach(function (item) {
      html += `
                <p>ID: ${item.id}</p>
                <p>Title: ${item.title}</p>
                <p>Description: ${item.des}</p>
                <p>Hover Color: ${item.hov_color}</p>
                <hr>
            `;
    });
    databaseData.innerHTML = html;
  }



  
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Create a Promise to handle the AJAX request
    const fetchData = new Promise((resolve, reject) => {
        fetchAjaxRequest("rdata_fetch_data", function (response) {
            // Store the data in the global array
            data = response;
            resolve(response); // Resolve the Promise with the data
        });
    });

    // Use the Promise to log the data outside the fetchAjaxRequest function
    fetchData.then((responseData) => {
        console.log("Data array:", data); // Log the updated data array here
        displayDatabaseData(responseData); // Display the data
    });
});



function fetchAjaxRequest(actions, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // Call the callback function with the data
                callback(response.data);
            } else {
                console.error(response);
            }
        }
    };

    xhr.send(`action=${actions}`);

}


});