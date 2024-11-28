
<?php 
// tooltip page 
?>

<div id="ikr_map_tooltip" class="ikrwmap_tooltip"></div>
<div class="ikrwmap_details_container" id="ikrwmap_details">
  <div id="closeDetail"> close</div>
        <div style="position: relative">
          <div id="detail_img" class="ikrwmap_detail_img">
            <img src="<?php echo plugins_url('../assets/images/worldmap.svg',__FILE__); ?>" alt="" id="ikrwmap_detail_img" />
          </div>
          <div class="ikrwmap_details">
            <!-- <h3 id="ikrmap_title" class="ikrmap_title"></h3> -->

            <div id="ikrmap_detail_des" class="ikrmap_detail_des"></div>

            <a id="ikrwmap_btnTxt" class="ikrwmap_tooltip_button" target="_blank" href="">
              Details</a
            >
          </div>
        </div>
      </div>