const ikrgooMap = document.querySelector(".svg_img_obj");

const tooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");
const map_img = document.getElementById("map_img");
const map_details = document.getElementById("map_details");
const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const closebtn = document.getElementById("close");
let tab = [];
console.log("robin");
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
  console.log(items);

  // add hover effect on mouse enter to the item

  function revalidetAjaxRequest() {
    // console.log('re')
    fetchAjaxRequest("rdata_fetch_data", (datas) => {
      items.forEach((clickItem) => {
        clickItem.addEventListener("mouseenter", showTooltip);
      });

      function showTooltip(hover) {
        let mapId = hover.target.id;
        // console.log(mapId)
        const get_target_element = ikrsvg.querySelector(`#${mapId}`);
        // console.log(get_target_element)
        // // add a stock color in map id
        get_target_element.style.stroke = "black";

        datas.map((item) => {
          // set the fill colore
          if (hover.target.tagName == "path") {
            let targetPath = hover.target;
            let getId = targetPath.getAttribute("id");
            if (mapId == getId && getId === item.map_id) {
              console.log(item.hov_color);
              targetPath.setAttribute("fill", item.hov_color);
            }
          }

          if (mapId == item.map_id) {
            tooltip.style.display = "block";
            tooltip.innerHTML = item.title;
            let cx = hover.clientX;
            let cy = hover.clientY;

            // clickItem.style.fill = 'red';
          }
        });
      }

      items.forEach((clickItem) => {
        clickItem.addEventListener("mouseenter", showTooltip);
      });

      // click to show the data on detail popup
      items.forEach((clickItem) => {
        clickItem.addEventListener("click", (ev) => {
          tooltip.style.display = "none";
          clickItem.removeEventListener("mouseenter", showTooltip);
          let mapId = ev.target.id;
console.log(map_id)
          map_id.value =  mapId;

          
          datas.forEach((item) => {
          

            if (item.map_id === mapId) {
              items.forEach((item) => {
                item.removeEventListener("mouseenter", showTooltip);
              });

              // add hide detail on click the closebtn
              closebtn.addEventListener("click", (e) => {
                detail.style.display = "none";
                items.forEach((item) => {
                  item.addEventListener("mouseenter", showTooltip);
                });
              });

              detail.style.display = "block";

              map_img.src = item.map_img;
              plotId.innerText = item.map_id;
              detail_name.innerHTML = item.title;
              detail_des.innerHTML = item.map_des;
              let cx = ev.clientX;
              let cy = ev.clientY;

              // window.open("https://google.com", "_blank");
              if (cx < 100 || cx < 160) {
                detail.style.left = `${cx + 100}px`;
              } else {
                detail.style.left = `${cx}px`;
              }
              if (cy < 100) {
                detail.style.top = `${cy + 100}px`;
              } else {
                detail.style.top = `${cy}px`;
              }
            }
          });
        });
      });

      items.forEach((mout) => {
        mout.addEventListener("mouseout", (mout) => {
          let mapId = mout.target.id;
          tooltip.style.display = "none";
          datas.map((item) => {
            if (mout.target.tagName == "path") {
              let targetPath = mout.target;
              let getId = targetPath.getAttribute("id");
              if (mapId == getId && getId === item.map_id) {
                console.log(item.hov_color);
                targetPath.setAttribute("fill", item.fill_color);
              }
            }
          });
        });
      });
    });
  }

  revalidetAjaxRequest();

  setInterval(revalidetAjaxRequest, 10000);
});
