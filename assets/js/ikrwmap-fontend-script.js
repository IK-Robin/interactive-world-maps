
    
    const ikrgooMap = document.querySelector(".svg_img_obj");

    const setImage = document.getElementById('setImage');

console.log(setImage)
    ikrgooMap.addEventListener("load", (irkcontent) => {
        // get the svg
        const ikrsvgDocc = ikrgooMap.contentDocument;
        const ikrsvg = ikrsvgDocc.querySelector("svg");
      
        console.log(ikrsvg)
        let items = ikrsvg.querySelectorAll("rect,path", "circle", "polygon");
      
        items.forEach((ev, ind) => {
          let ids = ev.id;
          let id = {
            id: ids,
          };
        
        });
       
        // select the svg path
        // console.log(tab)
      
        // map the item to  the dom and  add event listener
 
items.forEach(svg_path =>{
    svg_path.addEventListener("click",(ev) =>{
if(ev.target.dataset.img){
    setImage.src = ev.target.dataset.img
}
    });
});
      
  

      



    async function ikrwmap_retrive_data_from_db() {
        try {
          // fetch the data from the db
          const response = await world_map_fetchAjaxRequest(
            ikrwmap_get_url.featchdata,
            ikrwmap_get_url.ajax_url
          );
    
          console.log(response)
          // check the  response status code
    
          if (response.length == 0) {
            return;
          } else {
            // set the color of  the map based on the data
            items.forEach((mapId) => {
              response.forEach((data) => {
              
                if (mapId.id == data.map_id) {
                  const setColor = ikrsvg.querySelector(`#${mapId.id}`);
                 
                  setColor.style.fill = `${data.fill_color}`;
                  setColor.setAttribute("data-img", data.map_img);
              
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
    
