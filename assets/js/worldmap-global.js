  // make a function to add marker to the map
 



  // create ajax function
  function worldmp_makeAjaxRequestGlobal(formDataElem, action, callback) {
    var formData = new FormData(formDataElem);
    formData.append("action", action);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            // Assuming your server returns a success status
            if (response.success) {
                callback(true);
            } else {
                callback(false);
            }
        }
    };
    xhr.send(formData);
}
  // featch data functuon
  
  function world_map_fetchAjaxRequest_single_request(actions, callback) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // console.log(response);
        if (response.success) {
          callback(response.data); // Call the function to display data
        } else {
          // console.error(response);
        }
      }
    };
  
    xhr.send(`action=${actions}`); // Send the AJAX request to fetch data
  }
  
// ajax call with  multiple actions: async  await method
  
function world_map_fetchAjaxRequest(actions,ajaxurl) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        } else {
          reject(xhr.statusText);
        }
      }
    };

    xhr.send(`action=${actions}`);
  });
}