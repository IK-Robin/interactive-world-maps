const ikrgooMap = document.querySelector(".svg_img_obj");
const ikr_map_tooltip = document.getElementById("ikr_map_tooltip");
const ikrwmap_details = document.getElementById("ikrwmap_details");
const ikrwmap_btnTxt= document.getElementById('ikrwmap_btnTxt');


const ikrwmap_output = document.getElementById("ikrwmap_output");
const ikrwmap_outputs = document.querySelectorAll(`[data-id="ikrwmap_output"]`);

const ikrwmap_detail_img = document.getElementById("ikrwmap_detail_img");
const detail_img_container = document.getElementById("detail_img");
const ikrmap_detail_des = document.getElementById("ikrmap_detail_des");
// all reusable functions and variables are defined in the top of the code. The main logic is in the `ikrwmap'

document.addEventListener("DOMContentLoaded", (event) => {
  // Create the SVG element and set attributes
  const ikrwmap_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  ikrwmap_svg.setAttribute("viewBox", "0 0 1000 640");

  ikrwmap_svg.setAttribute("id", "svg4");

  // Set innerHTML of the SVG to include the path
  ikrwmap_svg.innerHTML = world_map_img;

  // Append the SVG to the output container
  document.getElementById("ikrwmap_output").appendChild(ikrwmap_svg);

  // Store the data globally so it can be reused
  let mapDataCache = null;

  const svg4 = document.getElementById("svg4");
  let items = svg4.querySelectorAll("rect, path, circle, polygon");

  async function ikrwmap_retrieve_data_from_db() {
    try {
      // Fetch the data from the database
      const response = await world_map_fetchAjaxRequest(
        ikrwmap_get_url.featchdata,
        ikrwmap_get_url.ajax_url
      );

      if (response.length === 0) {
        console.log("No data retrieved from the database.");
        return;
      }

      // Cache the data for later use
      mapDataCache = response;

      // Apply initial styles based on the data
      items.forEach((mapId) => {
        mapDataCache.forEach((data) => {
          if (mapId.id === data.map_id) {
            const setColor = svg4.querySelector(`#${mapId.id}`);
            setColor.style.fill = `${data.fill_color}`;
            // console.log(data.title)
            // check the data null or empity
            setColor.setAttribute(
              "data-fill",
              data.fill_color == null || "" ? "" : data.fill_color
            );
            setColor.setAttribute(
              "data-hover",
              data.hov_color == null || "" ? "" : data.hov_color
            );
            setColor.setAttribute(
              "data-img",
              data.map_img == null || "" ? "" : data.map_img
            );
            setColor.setAttribute(
              "data-link",
              data.map_link == null || "" ? "" : data.map_link
            );
            setColor.setAttribute(
              "data-title",
              data.title == null || "" ? "" : data.title
            );
            setColor.setAttribute(
              "data-desc",
              data.map_des == null || "" ? "" : data.map_des
            );
          }
        });
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // Initialize the map by retrieving data
  ikrwmap_retrieve_data_from_db();

  // Add event listeners to the SVG elements
  items.forEach((svg_path) => {
    // check the device mobile or desktop
    if (isMobile()) {
      svg_path.addEventListener("touchstart", (ev) => {
        ev.preventDefault(); // Prevent scrolling while moving
        ikrwmap_click_map_event(ev);
      });

      svg_path.addEventListener("touchend", (ev) => {
        // change the orginal color to hover color
        ev.preventDefault();
        ikrwmap_f_hideTooltip(ev);
      });
    } else {
      // Click event
      svg_path.addEventListener("click", (ev) => {
        ikrwmap_click_map_event(ev);
      });

      // Mousemove event
      svg_path.addEventListener("mousemove", (ev) => {
        if (mapDataCache) {
          const hoveredId = ev.target.id;
          const data = mapDataCache.find((d) => d.map_id === hoveredId);
          if (data) {
            // console.log("Hovered data:", data);
            // You can handle the mousemove logic here
            ikrwmap_f_showTooltip(ev);
          }
        }
      });

      // Mouseout event
      svg_path.addEventListener("mouseout", (ev) => {
        //  console.log(ev)
        // ikr_map_tooltip.style.display = "none";

        ikrwmap_f_hideTooltip(ev);
      });
    }

    // svg_path.addEventListener("touchend", () => {

    //   ikrwmap_f_hideTooltip(ev);
    // });
    // svg_path.addEventListener("touchcancel", ikrwmap_f_hideTooltip);
  });

  window.addEventListener('click', (ev) => {
    // Check if the click is within ikrwmap_details
    if (ikrwmap_details.contains(ev.target)) {
        return; // Do nothing if the click is inside ikrwmap_details
    }

    let matchFound = false;
    let i = 0;

    do {
        if (mapDataCache[i].map_id == ev.target.id) {
            matchFound = true;
            break;
        }
        i++;
    } while (i < mapDataCache.length);

    // If no match was found, hide the tooltip
    if (!matchFound) {
        ikrwmap_details.style.display = 'none';
    }
});

});





let isFirstClick = true;

function ikrwmap_click_map_event(ev) {
  const ct = ev.target;
  const ct_dataset = ct.dataset;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

//  console.log('pagex',ev.pageX )
  // Ensure the tooltip element is visible to get its dimensions accurately
  if (
    ikrwmap_details.style.display === "none" ||
    !ikrwmap_details.style.display
  ) {
    ikrwmap_details.style.display = "block";
    ikrwmap_details.style.visibility = "hidden"; // Prevent flashing on screen
  }

  const tooltipWidth = ikrwmap_details.offsetWidth;
  const tooltipHeight = ikrwmap_details.offsetHeight;

  ikrwmap_details.style.visibility = ""; // Restore visibility

  let tooltipX = 0;
  let tooltipY = 0;
console.log( 'page x ',ev.pageX)
console.log( 'page y ',ev.pageY)
  // Check if it's the first click
   if (isFirstClick) {

    if(ev.type == 'click'){
     
      if (screenWidth < 500 && ev.pageX > 120) {
        ikrwmap_details.style.left =
          ev.pageX - 150  + "px";
      } else if (screenWidth <900 && ev.pageX < 120){
        ikrwmap_details.style.left = ev.pageX + ev.pageX + "px";
      } else if (screenWidth > 500) {
        ikrwmap_details.style.left =
          ev.pageX - ikrwmap_details.offsetWidth + "px";
      } 
    
      if(ev.pageY >=400)  {
    
        ikrwmap_details.style.top =ev.pageY - ikrwmap_details.offsetHeight/2  + "px";   
        
      }else{
        ikrwmap_details.style.top =ev.pageY + "px";   
        }

      } else if( ev.type == 'touchstart'){
        if (screenWidth < 500 && ev.touches[0].pageX > 120) {
          ikrwmap_details.style.left =
            ev.touches[0].pageX - 150  + "px";
        } else if (screenWidth > 500) {
          ikrwmap_details.style.left =
            ev.touches[0].pageX - ikrwmap_details.offsetWidth + "px";
        } 
      
        if(ev.touches[0].pageY >=400)  {
      
          ikrwmap_details.style.top =ev.touches[0].pageY + ikrwmap_details.offsetHeight +30+ "px";   
          
        }else{
          ikrwmap_details.style.top =ev.touches[0].pageY + "px";   
          }
            isFirstClick = false; // Reset the flag after the first click
      }
      isFirstClick = false; // Reset the flag after the first click

  
}else{

    // Determine the event type: click or touchstart
    // tool tip show bottom 
    // if (ev.type === "click") {
    //   const clickX = ev.pageX;
    //   const clickY = ev.pageY;
    //   const tooltipWidth = ikrwmap_details.offsetWidth;
    //   const tooltipHeight = ikrwmap_details.offsetHeight;
    //   const screenWidth = window.innerWidth;
    //   const screenHeight = window.innerHeight;
    
    //   let tooltipX = clickX; // Default horizontal position
    //   let tooltipY = clickY + 20; // Default vertical position below the cursor (20px offset)
    
    //   // Horizontal position for click
    //   if (clickX + tooltipWidth > screenWidth) {
    //     tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
    //   } else if (clickX < 10) {
    //     tooltipX = 10; // Align to the left edge
    //   } else {
    //     tooltipX = clickX - tooltipWidth / 2; // Center horizontally around the cursor
    //   }
    
    //   // Vertical position for click (always below the cursor)
    //   if (tooltipY + tooltipHeight > screenHeight) {
    //     // If there's not enough space below, position tooltip above the cursor
    //     tooltipY = clickY - tooltipHeight - 20;
    //   }
    
    //   // Update tooltip position
    //   ikrwmap_details.style.left = `${tooltipX}px`;
    //   ikrwmap_details.style.top = `${tooltipY}px`;
    
    //   console.log("Tooltip Position:", { x: tooltipX, y: tooltipY });
    // }

    // show the cursor bottom 
    if (ev.type === "click") {
      const clickX = ev.pageX; // Cursor's X position
      const clickY = ev.pageY; // Cursor's Y position
      const tooltipWidth = ikrwmap_details.offsetWidth;
      const tooltipHeight = ikrwmap_details.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
    
      let tooltipX = clickX - tooltipWidth / 2; // Center the tooltip horizontally around the cursor
      let tooltipY = clickY - tooltipHeight - 10; // Position the tooltip above the cursor (10px offset)
    
      // Ensure the tooltip doesn't overflow horizontally
      if (tooltipX + tooltipWidth > screenWidth) {
        tooltipX = screenWidth - tooltipWidth - 10; // Align to the right edge
      } else if (tooltipX < 10) {
        tooltipX = 10; // Align to the left edge
      }
    
      // Ensure the tooltip doesn't overflow vertically
      if (tooltipY < 10) {
        tooltipY = clickY + 10; // If not enough space above, move it below the cursor
      }
    
      // Update tooltip position
      ikrwmap_details.style.left = `${tooltipX}px`;
      ikrwmap_details.style.top = `${tooltipY}px`;
    
      console.log("Tooltip Position:", { x: tooltipX, y: tooltipY });
    }
        
    
    // show tooltip cursor top 
    
    // else if (ev.type === "touchstart") {
    //   const touchX = ev.touches[0].pageX;
    //   const touchY = ev.touches[0].pageY;
    
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
  else if (ev.type === "touchstart") {
    const touchX = ev.touches[0].pageX;
    const touchY = ev.touches[0].pageY;
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
  
    console.log("Tooltip Position (Touchstart):", { x: tooltipX, y: tooltipY });
  }
  

}

  // Update tooltip content if dataset has relevant information
  if (
    (ct_dataset.img && ct_dataset.img.trim() !== "") ||
    (ct_dataset.link && ct_dataset.link.trim() !== "") ||
    (ct_dataset.title && ct_dataset.title.trim() !== "") ||
    (ct_dataset.desc && ct_dataset.desc.trim() !== "")
  ) {
    // Populate the tooltip content
    ikrmap_detail_des.innerHTML = `
      <h3 id="ikrmap_title" class="ikrmap_title">
        ${ct_dataset.title && ct_dataset.title !=='' ? ct_dataset.title : ct_dataset.name}
      </h3> 
      <p>${ct_dataset.desc ? ct_dataset.desc : ""}</p>
    `;

    // Update the image container
    if (ct_dataset.img && ct_dataset.img.trim() !== "") {
      ikrwmap_detail_img.src = ct_dataset.img; // Set image source
      detail_img_container.style.display = "block"; // Show image container
    } else {
      detail_img_container.style.display = "none"; // Hide if no image
    }
    if (ct_dataset.link && ct_dataset.link.trim() !== "") {
      ikrwmap_btnTxt.href= ct_dataset.link; // Set link
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

  // Apply hover style to the target element
  ct.style.fill = ct_dataset.hover ? ct_dataset.hover : "";
}




// const closeDetail = document.getElementById("closeDetail");
// closeDetail.addEventListener("click", () => {
//   ikrwmap_details.style.display = "none";
// });





function ikrwmap_f_showTooltip(hover) {
  let ct = hover.target;
  let data_name = ct.dataset;

  // // add a stock color in map id
  ct.style.stroke = "black";

  ct.style.fill = data_name.hover ? data_name.hover : "";
  ct.style.cursor = "pointer";

  ikr_map_tooltip.style.display = "block";
  // ikr_map_tooltip.innerHTML = data_name.title ==''? data_name.name: data_name.title;
  ikr_map_tooltip.innerHTML =     ` ${data_name.title && data_name.title !=='' ? data_name.title : data_name.name}`
  let cx = hover.pageX;
  let cy = hover.pageY;
  ikr_map_tooltip.style.top = cy - 30 + "px";
  ikr_map_tooltip.style.left = cx + "px";

  // tooltip.style.top = hover.layerY + "px";
  // tooltip.style.left = hover.layerX + "px";
}

// hide the tooltip

function ikrwmap_f_hideTooltip(ev) {
  let ct = ev.target;
  let data_name = ct.dataset;

  // Reset styles
  ct.style.stroke = "none";
  ct.style.fill = data_name.fill ? data_name.fill : "";

  // Hide the tooltip
  ikr_map_tooltip.style.display = "none";
}

function world_map_fetchAjaxRequest(actions, ajaxurl) {
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

// chekc it mobile or not
function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return regex.test(navigator.userAgent);
}
