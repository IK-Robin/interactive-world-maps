const ikrgooMap = document.querySelector(".svg_img_obj");
 
const tooltip = document.getElementById("ikr_map_tooltip");
const detail = document.getElementById("detail");

const form_inp = document.getElementById("rdata_from");

const map_id = document.getElementById("map_id");

const ikrTitle = document.getElementById("ikrTitle");

const ikrdes = document.getElementById("ikrdes");

const map_details = document.getElementById("map_details");

const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const closebtn = document.getElementById("close");

const hovecolor = document.getElementById("hovecolor");
const fill_color = document.getElementById("fill_color");

const typeHovcolor = document.getElementById("typeHovcolor");
const filltype = document.getElementById("filltype");

const ikrwmap_submit_form = document.getElementById("rdata_submit_form");

// select all edit form input
const ikrwmap_from_edit = document.getElementById("rdata_from_edit");

const modal_map_id = document.getElementById("modal_map_id");
const modal_ikrTitle = document.getElementById("modal_ikrTitle");

const modal_ikrdes = document.getElementById("modal_ikrdes");

const modal_typeHovcolor = document.getElementById("modal_typeHovcolor");
const modal_hovecolor = document.getElementById("modal_hovecolor");

const modal_filltype = document.getElementById("modal_filltype");
const modal_fill_color = document.getElementById("modal_fill_color");

const ikr_select_img = document.getElementById("ikr_select_img");

const modal_ikr_select_img = document.getElementById("modal_ikr_select_img");
const modal_ikr_img = document.getElementById("modal_ikr_img");

const ikr_w_img_inp = document.getElementById("ikr_w_img");

const modal_link = document.getElementById("modal_link");
const modal_link_edit = document.getElementById("modal_link_edit");
const successMessage = document.getElementById("successMessage");
const detail_img_container = document.getElementById("detail_img");
const ikrwmap_details = document.getElementById("ikrwmap_details");

//  get data on load

let tab = [];

// console.log(closebtn)
ikrgooMap.addEventListener("load", (irkcontent) => {
  // get the svg
  const ikrsvgDocc = ikrgooMap.contentDocument;
  const ikrsvg = ikrsvgDocc.querySelector("svg");

  let items = ikrsvg.querySelectorAll("rect,path", "circle", "polygon");

  items.forEach((ev, ind) => {
    let ids = ev.id;
    let id = {
      id: ids,
    };
    tab.push(id);
  });

  // select the svg path
  // console.log(tab)

  // map the item to  the dom and  add event listener

  items.forEach((map_item, index) => {
    map_item.addEventListener("click", (ev) => {
      map_click_func(ev);
    });

    // add mouse move event
    map_item.addEventListener("mousemove", (move_ev) => {
      showTooltip(move_ev);
    });
    map_item.addEventListener("mouseout", (move_ev) => {
      hideTooltip(move_ev);
    });
 
  });

  function showTooltip(hover) {
    let ct = hover.target;
    let data_name = ct.dataset;

    // // add a stock color in map id
    ct.style.stroke = "black";

    ct.style.fill = data_name.hover ? data_name.hover : "";
    ct.style.cursor = "pointer";

    tooltip.style.display = "block";
    tooltip.innerHTML = data_name.name;
    let cx = hover.clientX;
    let cy = hover.clientY;
    tooltip.style.top = cy - tooltip.offsetHeight - 20 + "px";
    tooltip.style.left = cx - tooltip.offsetWidth / 3 + "px";

    // tooltip.style.top = hover.layerY + "px";
    // tooltip.style.left = hover.layerX + "px";
  }

  function hideTooltip(ev) {
    let ct = ev.target;
    ct.style.stroke = "none";
    let data_name = ct.dataset;
    // console.log(data_name)
    ct.style.fill = data_name.fill ? data_name.fill : "";
    tooltip.style.display = "none";
  }
  let isFirstClick = true;

  function map_click_func(event) {
    const ct = event.target;
    // get dataset from the svg path

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const data_set = ct.dataset;
    // get the id of  the clicked item
    const click_id = ct.id;

    // set the id of the click item id in input fild map_id
    map_id.value = click_id;
    if (map_id.value !== "") {
      ikrwmap_submit_form.removeAttribute("disabled", "");
    }

    if (
      ikrwmap_details.style.display === "none" ||
      !ikrwmap_details.style.display
    ) {
      ikrwmap_details.style.display = "block";
      ikrwmap_details.style.visibility = "hidden"; // Prevent flashing on screen
    }

    ikrwmap_details.style.visibility = ""; // Restore visibility

    if (isFirstClick) {
      if (event.type == "click") {
        if (screenWidth < 500 && event.pageX > 120) {
          ikrwmap_details.style.left = event.pageX - 150 + "px";
        } else if (screenWidth < 900 && event.pageX < 120) {
          ikrwmap_details.style.left = event.pageX + event.pageX + "px";
        } else if (screenWidth > 500) {
          ikrwmap_details.style.left =
            event.pageX - ikrwmap_details.offsetWidth + "px";
        }

        if (event.pageY >= 400) {
          ikrwmap_details.style.top =
            event.pageY - ikrwmap_details.offsetHeight / 2 + "px";
        } else {
          ikrwmap_details.style.top = event.pageY + "px";
        }
      } else if (event.type == "touchstart") {
        if (screenWidth < 500 && event.touches[0].pageX > 120) {
          ikrwmap_details.style.left = event.touches[0].pageX - 150 + "px";
        } else if (screenWidth > 500) {
          ikrwmap_details.style.left =
            event.touches[0].pageX - ikrwmap_details.offsetWidth + "px";
        }

        if (event.touches[0].pageY >= 400) {
          ikrwmap_details.style.top =
            event.touches[0].pageY + ikrwmap_details.offsetHeight + 30 + "px";
        } else {
          ikrwmap_details.style.top = event.touches[0].pageY + "px";
        }
        isFirstClick = false; // Reset the flag after the first click
      }
      isFirstClick = false; // Reset the flag after the first click
    } else {
      // Determine the eventent type: click or touchstart
      // tool tip show bottom
      if (event.type === "click") {
        const clickX = event.pageX;
        const clickY = event.pageY;
        const tooltipWidth = ikrwmap_details.offsetWidth;
        const tooltipHeight = ikrwmap_details.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let tooltipX = clickX; // Default horizontal position
        let tooltipY = clickY + 20; // Default vertical position below the cursor (20px offset)

        // Horizontal position for click
        if (clickX + tooltipWidth > screenWidth) {
          tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
        } else if (clickX < 10) {
          tooltipX = 10; // Align to the left edge
        } else {
          tooltipX = clickX - tooltipWidth / 2; // Center horizontally around the cursor
        }

        // Vertical position for click (always below the cursor)
        if (tooltipY + tooltipHeight > screenHeight) {
          // If there's not enough space below, position tooltip above the cursor
          tooltipY = clickY - tooltipHeight - 20;
        }

        // Update tooltip position
        ikrwmap_details.style.left = `${tooltipX}px`;
        ikrwmap_details.style.top = `${tooltipY}px`;

        console.log("Tooltip Position:", { x: tooltipX, y: tooltipY });
      }

      // show the cursor bottom
      // if (event.type === "click") {
      //   const clickX = event.pageX; // Cursor's X position
      //   const clickY = event.pageY; // Cursor's Y position
      //   const tooltipWidth = ikrwmap_details.offsetWidth;
      //   const tooltipHeight = ikrwmap_details.offsetHeight;
      //   const screenWidth = window.innerWidth;
      //   const screenHeight = window.innerHeight;

      //   let tooltipX = clickX - tooltipWidth / 2; // Center the tooltip horizontally around the cursor
      //   let tooltipY = clickY - tooltipHeight - 10; // Position the tooltip above the cursor (10px offset)

      //   // Ensure the tooltip doesn't overflow horizontally
      //   if (tooltipX + tooltipWidth > screenWidth) {
      //     tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
      //   } else if (tooltipX < 10) {
      //     tooltipX = 10; // Align to the left edge
      //   }

      //   // Ensure the tooltip doesn't overflow vertically
      //   if (tooltipY < 10) {
      //     tooltipY = clickY + 10; // If not enough space above, move it below the cursor
      //   }

      //   // Update tooltip position
      //   ikrwmap_details.style.left = `${tooltipX}px`;
      //   ikrwmap_details.style.top = `${tooltipY}px`;

      //   console.log("Tooltip Position:", { x: tooltipX, y: tooltipY });
      // }

      // show tooltip cursor top

      // else if (event.type === "touchstart") {
      //   const touchX = event.touches[0].pageX;
      //   const touchY = event.touches[0].pageY;

      //   let tooltipX = touchX; // Default horizontal position
      //   let tooltipY = touchY - tooltipHeight - 10; // Default vertical position above the touch point (10px offset)

      //   // Horizontal position for touch
      //   if (touchX + tooltipWidth > screenWidth) {
      //     tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
      //   } else if (touchX < 10) {
      //     tooltipX = 10; // Align to the left edge
      //   } else {
      //     tooltipX = touchX - tooltipWidth / 2; // Center horizontally around the touch point
      //   }

      //   // Vertical position for touch (always above the touch point)
      //   if (tooltipY < 10) {
      //     // If there's not enough space above, adjust to fit within the screen
      //     tooltipY = 10;
      //   }

      //   // Update tooltip position
      //   ikrwmap_details.style.left = `${tooltipX}px`;
      //   ikrwmap_details.style.top = `${tooltipY}px`;

      //   console.log("Tooltip Position (Touchstart):", { x: tooltipX, y: tooltipY });
      // }

      // show tooltip cursor bottom
      else if (event.type === "touchstart") {
        const touchX = event.touches[0].pageX;
        const touchY = event.touches[0].pageY;
        const tooltipWidth = ikrwmap_details.offsetWidth;
        const tooltipHeight = ikrwmap_details.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let tooltipX = touchX; // Default horizontal position
        let tooltipY = touchY + 20; // Default vertical position below the touch point (20px offset)

        // Horizontal position for touch
        if (touchX + tooltipWidth > screenWidth) {
          tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
        } else if (touchX < 10) {
          tooltipX = 10; // Align to the left edge
        } else {
          tooltipX = touchX - tooltipWidth / 2; // Center horizontally around the touch point
        }

        // Vertical position for touch (always below the touch point)
        if (tooltipY + tooltipHeight > screenHeight) {
          // If there's not enough space below, adjust to fit within the screen
          tooltipY = screenHeight - tooltipHeight - 10;
        }

        // Update tooltip position
        ikrwmap_details.style.left = `${tooltipX}px`;
        ikrwmap_details.style.top = `${tooltipY}px`;

        console.log("Tooltip Position (Touchstart):", {
          x: tooltipX,
          y: tooltipY,
        });
      }
    }

    if (data_set.dataadded == "true") {
      // get the data from the dataset
      ikrTitle.value = data_set.title ? data_set.title : "";

      ikrdes.value = data_set.desc ? data_set.desc : "";

      hovecolor.value = data_set.hover ? data_set.hover : "";

      typeHovcolor.value = data_set.hover ? data_set.hover : "";

      fill_color.value = data_set.fill ? data_set.fill : "";
      filltype.value = data_set.fill ? data_set.fill : "";

      modal_link.value = data_set.link ? data_set.link : "";

      ikr_w_img_inp.value = data_set.img ? data_set.img : "";

      // change the submit button value

      ikrwmap_submit_form.value = "Edit";
    } else {
      ikrTitle.value = "";
      ikrdes.value = "";
      modal_link.value = "";
      ikr_w_img_inp.value = "";
      ikrwmap_submit_form.value = "Submit";
    }
// Update tooltip content if dataset has relevant information
if (
  (data_set.img && data_set.img.trim() !== "") ||
  (data_set.link && data_set.link.trim() !== "") ||
  (data_set.title && data_set.title.trim() !== "") ||
  (data_set.desc && data_set.desc.trim() !== "")
) {
  // Populate the tooltip content
  ikrmap_detail_des.innerHTML = `
    <h3 id="ikrmap_title" class="ikrmap_title">
      ${data_set.title && data_set.title !=='' ? data_set.title : data_set.name}
    </h3> 
    <p>${data_set.desc ? data_set.desc : ""}</p>
  `;

  // Update the image container
  if (data_set.img && data_set.img.trim() !== "") {
    ikrwmap_detail_img.src = data_set.img; // Set image source
    detail_img_container.style.display = "block"; // Show image container
  } else {
    detail_img_container.style.display = "none"; // Hide if no image
  }
  if (data_set.link && data_set.link.trim() !== "") {
    ikrwmap_btnTxt.href= data_set.link; // Set link
    ikrwmap_btnTxt.style.display = "block"; // Show image container
  } else {
    ikrwmap_btnTxt.style.display = "none"; // Hide if no image
  }
   
  // Show tooltip
  ikrwmap_details.style.display = "block";
} else {
  // Hide the tooltip if no valid content
  ikrwmap_details.style.display = "none";
}

  }

  // add form submition  eventent listener

  // work with form data and changet the color  of the item  based on the selected color input
  function updateColor() {
    var textInput = document.getElementById("hovecolor");
    var colorInput = document.getElementById("typeHovcolor");

    // Get the value from the text input
    var colorValue = textInput.value;
    colorInput.value = colorValue;
    // Check if the input value is a valid hex color code
  }
  console.log(typeHovcolor)

  const colorTypes = (element, value) => {
    console.log(element)
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

  // change the color modal input color
  colorTypes(modal_typeHovcolor, modal_hovecolor);
  colorTypes(modal_filltype, modal_fill_color);

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);

  // change the color modal input color

  setColorType(modal_hovecolor, modal_typeHovcolor);
  setColorType(modal_fill_color, modal_filltype);

  // select media from wordpress media

  ikr_select_img.addEventListener("click", (ev) => {
    select_media_url(ev, ikr_w_img_inp);
  });
  modal_ikr_select_img.addEventListener("click", (ev) => {
    select_media_url(ev, modal_ikr_img);
  });

  function select_media_url(event, input_ele) {
    event.preventDefault();

    // Create a media frame
    const mediaFrame = wp.media({
      title: "Select Image",
      button: {
        text: "Use this image",
      },
      multiple: false, // Set to false to allow only one image to be selected
    });

    // When an image is selected, run a callback.
    mediaFrame.on("select", function () {
      const attachment = mediaFrame.state().get("selection").first().toJSON();
      input_ele.value = attachment.url; // Set image URL to input
    });

    // Open the media frame
    mediaFrame.open();
  }

  form_inp.addEventListener("submit", (subEv) => {
    subEv.preventDefault(); // Prevent default form submission

    const change_color = ikrsvg.querySelector(`#${map_id.value}`);
    change_color.style.fill = fill_color.value;

    // check the value of the submit btn to change the edit or add mode

    if (ikrwmap_submit_form.value == "Edit") {
      // send request to edit the data
      worldmp_makeAjaxRequestGlobal(
        form_inp,
        your_ajax_object.edit_data,
        (success) => {
          if (success) {
            console.log("Data successfully sent to the server.");
            ikrwmap_success_message("success", "Data Update successfully");
            // Fetch data from the database after the data is sent successfully
            ikrwmap_retrive_data_from_db();
          } else {
            console.log("Failed to send data.");
          }
        }
      );
    } else {
      // Create a FormData object to capture the form values

      worldmp_makeAjaxRequestGlobal(
        form_inp,
        your_ajax_object.action,
        (success) => {
          if (success) {
            ikrwmap_success_message(
              "success",
              "Data successfully sent to the server."
            );

            // Fetch data from the database after the data is sent successfully
            ikrwmap_retrive_data_from_db();
          } else {
            console.log("Failed to send data.");
          }
        }
      );
    }

    // ikrwmap_retrive_data_from_db();
  });

  //  edit data from list
  ikrwmap_from_edit.addEventListener("submit", (edtisub) => {
    edtisub.preventDefault();

    // Create a Bootstrap modal instance
    bootstrap.Modal.getInstance(
      document.getElementById("ikr_map_data_edit")
    ).hide();

    worldmp_makeAjaxRequestGlobal(
      ikrwmap_from_edit,
      your_ajax_object.edit_data,
      (success) => {
        if (success) {
          console.log("Data successfully sent to the server.");
          ikrwmap_success_message("success", "Data Update successfully");
          // Fetch data from the database after the data is sent successfully
          ikrwmap_retrive_data_from_db();
        } else {
          console.log("Failed to send data.");
          ikrwmap_success_message("error", "Failed to send data.");
        }
      }
    );
  });

  // get the data asynconalsy

  async function ikrwmap_retrive_data_from_db() {
    console.log("robin");
    try {
      // fetch the data from the db
      const response = await world_map_fetchAjaxRequest(
        your_ajax_object.feacth,
        your_ajax_object.ajax_url
      );

      // check the  response status code

      if (response.length == 0) {
        return;
      } else {
        // set the color of  the map based on the data
        items.forEach((mapId) => {
       
          response.forEach((data) => {
            if (mapId.id == data.map_id) {
              const setColor = ikrsvg.querySelector(`#${mapId.id}`);
              setColor.setAttribute("data-fill", data.fill_color);
              setColor.setAttribute("data-hover", data.hov_color);
              setColor.setAttribute("data-title", data.title);
              setColor.setAttribute("data-desc", data.map_des);
              setColor.setAttribute("data-img", data.map_img);
              setColor.setAttribute("data-link", data.map_link);
              setColor.setAttribute("data-dataadded", "true");
              setColor.style.fill = `${data.fill_color}`;
            }
          });
          
          // hide the tooltip on dashbord 
          window.addEventListener('click', (ev) => {
            // Check if the click is within ikrwmap_details
            if (ikrwmap_details.contains(ev.target)) {
                return; // Do nothing if the click is inside ikrwmap_details
            }
        
            let matchFound = false;
            let i = 0;
        
            do {
                if (response[i].map_id == ev.target.id) {
                    matchFound = true;
                    break;
                }
                i++;
            } while (i < response.length);
        
            // If no match was found, hide the tooltip
            if (!matchFound) {
                ikrwmap_details.style.display = 'none';
            }
        });

        });

        // Array of objects for initial population
        // Function to populate the table
        function populateTable(data) {
          const tableBody = document.querySelector("#mapTable tbody");
          console.log(tableBody);
          tableBody.innerHTML = ""; // Clear existing rows

          data.forEach((item, ind) => {
            const row = document.createElement("tr");
            row.classList.add("shadow", "my-2");

            // Limit content to the first 5 words
            const limitWords = (text, wordLimit) => {
              const words = text.split(" ");
              return words.length > wordLimit
                ? words.slice(0, wordLimit).join(" ") + "..."
                : text;
            };

            row.innerHTML = `
                  <td>${ind + 1}</td>
                  <td>${item.map_id}</td>
                  <td>${limitWords(item.title, 5)}</td>
                  <td>${limitWords(item.map_des, 4)}</td>
                  <td style="background-color: ${item.hov_color};">${
              item.hov_color
            }</td>
                  <td style="background-color: ${item.fill_color};">${
              item.fill_color
            }</td>
                  <td>
                      <button class="edit-btn btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#ikr_map_data_edit" data-id="${
                        item.map_id
                      }" data-edit="ikr_data_edit">Edit</button>
                      
                      <form  class="d-inline" action=""  data-id="${
                        item.map_id
                      }" data-form_id="delete_form">
                          <input type="hidden" name="map_id" value="${
                            item.map_id
                          }">
                          <input type="hidden" name="w_map_form_delete_nonce" value="${deleteNonce}">
                          <button type="submit" class="delete-btn btn btn-sm btn-danger" data-delete="ikr_data_delete" data-id="${
                            item.map_id
                          }">Delete</button>
                      </form>
                  </td>
              `;

            tableBody.appendChild(row);
          });
        }

        // add modal value on click
        // get modal input
        populateTable(response);

        const editElements = document.querySelectorAll(
          '[data-edit="ikr_data_edit"]'
        );

        // Loop through each selected element and edit db
        editElements.forEach((edit_ele) => {
          // add a click event to get the dataset
          edit_ele.addEventListener("click", (ev) => {
            const id = ev.target.dataset.id;
            // find the existing data
            const itemData = response.find((item) => item.map_id === id);

            modal_map_id.value = itemData.map_id;
            modal_ikrTitle.value = itemData.title;
            modal_ikrdes.value = itemData.map_des;
            modal_typeHovcolor.value = itemData.hov_color;
            modal_hovecolor.value = itemData.hov_color;
            modal_fill_color.value = itemData.fill_color;
            modal_filltype.value = itemData.fill_color;
            modal_ikr_img.value = itemData.map_img;
            modal_link_edit.value = itemData.map_link;
          });
        });

        // delete the database  entry  on delete button click

        const delete_state_data = document.querySelectorAll(
          '[data-form_id="delete_form"]'
        );

        delete_state_data.forEach((delete_ele) => {
          delete_ele.addEventListener("submit", (ev) => {
            ev.preventDefault(); // Prevent the default form submission
            const deleted_element = ikrsvg.querySelector(
              `#${delete_ele.dataset.id}`
            );

            // Show a confirmation alert
            const isConfirmed = confirm(
              "Are you sure you want to delete this item?"
            );

            // If the user confirms, submit the form
            if (isConfirmed) {
              worldmp_makeAjaxRequestGlobal(
                delete_ele,
                your_ajax_object.delete_data,
                (success) => {
                  if (success) {
                    console.log("Data  sent to the server.");
                    ikrwmap_success_message(
                      "success",
                      " Data deleted successfully"
                    );
                    // Fetch data from the database after the data is sent successfully

                    deleted_element.removeAttribute("data-fill", "");
                    deleted_element.removeAttribute("data-hover", "");
                    deleted_element.removeAttribute("data-title", "");
                    deleted_element.removeAttribute("data-desc", "");
                    deleted_element.removeAttribute("data-img", "");
                    deleted_element.removeAttribute("data-link", "");
                    deleted_element.removeAttribute("data-dataadded", "");

                    ikrwmap_retrive_data_from_db();
                  } else {
                    console.log("Failed to send data.");
                  }
                }
              );
              // get map state

              const remove_color = ikrsvg.querySelector(
                `#${ev.target.dataset.id}`
              );
              remove_color.style.fill = "";
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  ikrwmap_retrive_data_from_db();
});

function ikrwmap_success_message(type, messages) {
  if (type == "error") {
    // Show the success message
    successMessage.classList.remove("ikrwmap_hidden");
    successMessage.classList.add("ikrwmap_show");
    successMessage.style.backgroundColor = "red";
    successMessage.innerHTML = messages;
  }
  if (type == "success") {
    successMessage.classList.remove("ikrwmap_hidden");
    successMessage.classList.add("ikrwmap_show");
    successMessage.style.backgroundColor = "#4CAF50";
    successMessage.innerHTML = messages;
  }
  // Show the success message

  // Hide the success message after 1 second
  setTimeout(() => {
    successMessage.classList.remove("ikrwmap_show");
    setTimeout(() => {
      successMessage.classList.add("ikrwmap_hidden");
    }, 500); // Wait for the transition to finish
  }, 1000);
}
