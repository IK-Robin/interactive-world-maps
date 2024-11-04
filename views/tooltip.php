
<?php 
// tooltip page 
?>

<div id="ikr_map_tooltip" class="ikr_map_tooltip"></div>
<div class="detail" id="detail">
        <div style="position: relative">
          <div id="detail_img" class="ikr_detail_img">
            <img src="<?php echo plugins_url('../assets/images/worldmap.svg',__FILE__); ?>" alt="" id="map_img" />
          </div>
          <div class="map_details">
            <p id="plotId" class="map_title"></p>

            <div id="detail_des" class="detail_des"></div>

            <a id="btnTxt" class="map_tooltip_button" target="_blank" href="">
              Details</a
            >
          </div>
        </div>
      </div>