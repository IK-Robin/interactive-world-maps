document.addEventListener("DOMContentLoaded", function () {
 


  function updateColor() {
    var textInput = document.getElementById("hovecolor");
    var colorInput = document.getElementById("typeHovcolor");

    // Get the value from the text input
    var colorValue = textInput.value;
    colorInput.value = colorValue;
    // Check if the input value is a valid hex color code
  }

  const colorTypes = (element, value) => {
    element.addEventListener("change", (ev) => {
      value.value = ev.target.value;
    });
  };

  const checkHexCode = (element, tColor, value) => {
    var isValidHex = /^#[0-9A-F]{6}$/i.test(value);

    if (isValidHex) {
      // Prepend the "#" symbol to the input value
      value = value;
      console.log(value);
      // Set the color input value
      tColor.value = value;
      element.style.backgroundColor = "#fff";
    } else {
      console.log("Not a valid hex color code");

      element.style.backgroundColor = "red";
    }
  };

  // set the color on input filde if the clore is change
  colorTypes(typeHovcolor, hovecolor);
  colorTypes(filltype, fill_color);
  colorTypes(typeClickColor, clickColor);

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);
  setColorType(clickColor, typeClickColor);

  // hovecolor.addEventListener("keyup", (ev) => {
  //   let colorValue = ev.target.value;
  //   checkHexCode(hovecolor,typeHovcolor,colorValue);
  //   // Check if the input value is a valid hex color code

  // });

  const form = document.getElementById("rdata_from");
  const dataEntries = document.getElementById("data-entries");
  const addEntryBtn = document.getElementById("add-entry-btn");
  fetchAjaxRequest("rdata_fetch_data", (response) => {
    displayDatabaseData(response);
  });

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

  // Submit form via AJAX
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    formData.append("action", your_ajax_object.action);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // console.log(response.data);
          console.log(response);
          // Handle success message or any other action
        } else {
          // console.log(response.data);
          // Handle error message or any other action
        }
      }
    };
    xhr.send(formData);

    setTimeout(() => {
      // console.log("hh");
      fetchAjaxRequest("rdata_fetch_data", function (response) {
        displayDatabaseData(response);
      });
    }, 100);

    // get the svg and set the data attribut

    const ikrgooMap = document.querySelector(".svg_img_obj");
    const map_id = document.getElementById("map_id");
    console.log(ikrgooMap);
    // get the svg
    const ikrsvgDocc = ikrgooMap.contentDocument;
    const ikrsvg = ikrsvgDocc.querySelector("svg");
    let ikrItems = ikrsvg.querySelectorAll("rect, path, circle, polygon");
    console.log(ikrItems)
    ikrItems.forEach(item => {

      let itemid = item.getAttribute("id").trim();
      
      if (itemid === map_id.value.trim()) {
        item.setAttribute("data-title",ikrTitle.value );
        item.setAttribute("data-des",ikrdes.value );
        
        console.log('found')
      } else {
        console.log('not found');
      }
    });
    
    // With this correction, the querySelectorAll method should now properly select all the desired elements, and the condition inside the forEach loop should work as expected.
    
    
    
    
    
    
    


// end from submit 

  });
});

function fetchAjaxRequest(actions, callback) {
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
