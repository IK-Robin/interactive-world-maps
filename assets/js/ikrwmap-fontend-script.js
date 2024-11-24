const ikrgooMap = document.querySelector(".svg_img_obj");
const ikr_map_tooltip = document.getElementById("ikr_map_tooltip");
const ikrwmap_details = document.getElementById("ikrwmap_details");

const ikrwmap_output = document.getElementById("ikrwmap_output");
const ikrwmap_outputs = document.querySelectorAll(`[data-id="ikrwmap_output"]`);

const ikrwmap_detail_img = document.getElementById("ikrwmap_detail_img"); 
const detail_img_container = document.getElementById("detail_img"); 
const ikrmap_detail_des = document.getElementById('ikrmap_detail_des')
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
            setColor.setAttribute("data-fill", data.fill_color==null || ''? '': data.fill_color );
            setColor.setAttribute("data-hover", data.hov_color ==null || ''? '': data.hov_color );
            setColor.setAttribute("data-img", data.map_img ==null || ''? '': data.map_img );
            setColor.setAttribute("data-link", data.map_link ==null || ''? '': data.map_link );
            setColor.setAttribute("data-title", data.title == null|| ''? '' :data.title );
            setColor.setAttribute("data-desc", data.map_des == null|| ''?'': data.map_des);
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
    if(isMobile()){

      
    svg_path.addEventListener("touchstart", (ev) => {
      ev.preventDefault(); // Prevent scrolling while moving
      ikrwmap_click_map_event(ev);
    });



    }else{

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
      console.log("Hovered data:", data);
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


});

function ikrwmap_click_map_event(ev) {
  
  const ct_dataset = ev.target.dataset;
    
    
  // check the event type 

  if(ev.type =='click'){
    ikrwmap_details.style.left = ev.pageX + "px";
    ikrwmap_details.style.top = ev.pageY + "px";
  }else if(ev.type == 'touchstart'){
    ikrwmap_details.style.left = ev.touches[0].pageX + "px";
    ikrwmap_details.style.top = ev.touches[0].pageY + "px";
  }



      // Check if any dataset value is non-empty to show the tooltip
      if (
        (ct_dataset.img && ct_dataset.img.trim() !== "") || // Ensure img is not empty
        (ct_dataset.link && ct_dataset.link.trim() !== "") || // Ensure link is not empty
        (ct_dataset.title && ct_dataset.title.trim() !== "") || // Ensure title is not empty
        (ct_dataset.desc && ct_dataset.desc.trim() !== "") // Ensure desc is not empty
      ) {
        // Show the tooltip
        ikrwmap_details.style.display = "block";
      
    
        // Update title and description
        ikrmap_detail_des.innerHTML = `
          <h3 id="ikrmap_title" class="ikrmap_title">
            ${ct_dataset.title ? ct_dataset.title : ""}
          </h3> 
          <p>${ct_dataset.desc ? ct_dataset.desc : ""}</p>
        `;
    
        // Show or hide the image container based on the 'img' dataset
        if (ct_dataset.img && ct_dataset.img.trim() !== "") {
          ikrwmap_detail_img.src = ct_dataset.img; // Set the image if it's available
          detail_img_container.style.display = "block"; // Show image container
        } else {
          detail_img_container.style.display = "none"; // Hide image container if 'img' is empty
        }
        if (ct_dataset.title && ct_dataset.title.trim() !== "") {
          ikrmap_detail_des.src = ct_dataset.title; // Set the image if it's available
          ikrmap_detail_des.style.display = "block"; // Show image container
        } else {
          ikrmap_detail_des.style.display = "none"; // Hide image container if 'img' is empty
        }
      } 
}

function ikrwmap_f_showTooltip(hover) {
  let ct = hover.target;
  let data_name = ct.dataset;

  // // add a stock color in map id
  ct.style.stroke = "black";

  ct.style.fill = data_name.hover ? data_name.hover : "";
  ct.style.cursor = "pointer";

  ikr_map_tooltip.style.display = "block";
  // ikr_map_tooltip.innerHTML = data_name.title ==''? data_name.name: data_name.title;
  ikr_map_tooltip.innerHTML =  data_name.name;
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
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
 
  return regex.test(navigator.userAgent);
}