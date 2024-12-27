
<?php

if ( ! defined( 'ABSPATH' ) ) exit;


?> 
    
<div class="ikrwmap_world_map_img" id="ikrwmap_world_map_img">
<?php 
  include_once(__DIR__ . '/tooltip.php');
?>
<object class="svg_img_obj" data=" <?php echo esc_url( plugins_url( "../assets/images/worldmap.svg", __FILE__ ) );?>" ></object>

<div id="successMessage" class="ikrwmap_hidden">Form submitted successfully!</div>
</div> 



<?php
?>


