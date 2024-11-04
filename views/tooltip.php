
<?php 
// tooltip page 
?>

<div id="ikr_map_tooltip" class="ikr_map_tooltip"></div>
<div class="detail" id="detail">
        <div style="position: relative">
          <div id="detail_img" class="ikrwmap_detail_img">
            <img src="<?php echo plugins_url('../assets/images/worldmap.svg',__FILE__); ?>" alt="" id="ikrwmap_detail_img" />
          </div>
          <div class="ikrwmap_details">
            <h3 id="ikrmap_title" class="ikrmap_title"></h3>

            <div id="ikrmap_detail_des" class="ikrmap_detail_des"></div>

            <a id="btnTxt" class="map_tooltip_button" target="_blank" href="">
              Details</a
            >
          </div>
        </div>
      </div>