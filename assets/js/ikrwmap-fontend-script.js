const ikrgooMap = document.querySelector(".svg_img_obj");
const ikr_map_tooltip = document.getElementById("ikr_map_tooltip");
const ikrwmap_details = document.getElementById("ikrwmap_details");

const ikrwmap_output = document.getElementById("ikrwmap_output");
const ikrwmap_outputs = document.querySelectorAll(`[data-id="ikrwmap_output"]`);
console.log(ikrwmap_details);

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
console.log(data.title)
            // check the data null or empity 
            setColor.setAttribute("data-fill", data.fill_color==null || ''? '': data.fill_color );
            setColor.setAttribute("data-hover", data.hov_color ==null || ''? '': data.hov_color );
            setColor.setAttribute("data-img", data.map_img ==null || ''? '': data.map_img );
            setColor.setAttribute("data-link", data.map_link ==null || ''? '': data.map_link );
            setColor.setAttribute("data-title", data.title == null|| ''? '' :data.title );
            setColor.setAttribute("data-desc", data.map_desc == null|| ''?'': data.map_desc);
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
    // Click event
    svg_path.addEventListener("click", (ev) => {
      const ct_dataset = ev.target.dataset;
      if (
        ct_dataset.img ||
        ct_dataset.link ||
        ct_dataset.title ||
        ct_dataset.desc
      ) {
        ikrwmap_details.style.display = "block";
        ikrwmap_details.style.left = ev.pageX + "px";
        ikrwmap_details.style.top = ev.pageY + "px";
        console.log(mapDataCache);
      }
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
     console.log(ev)
      // ikr_map_tooltip.style.display = "none";
      

      ikrwmap_f_hideTooltip(ev);
    });


  });
});


function ikrwmap_f_showTooltip(hover) {
  let ct = hover.target;
  let data_name = ct.dataset;

  // // add a stock color in map id
  ct.style.stroke = "black";

  ct.style.fill = data_name.hover ? data_name.hover : "";
  ct.style.cursor = "pointer";

  ikr_map_tooltip.style.display = "block";
  ikr_map_tooltip.innerHTML = data_name.title ==''? data_name.name: data_name.title;
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
  ct.style.stroke = "none";
  let data_name = ct.dataset;

  ct.style.fill = data_name.fill ? data_name.fill : "";

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
