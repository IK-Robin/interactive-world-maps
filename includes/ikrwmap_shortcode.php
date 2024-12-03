<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// Define a function to handle the shortcode output
function ikrwmap_shortcode_function() {
    // Start output buffering
    ob_start();
    ?>
    <!-- Output the <div> element with the specified ID "map" -->
    <div id="ikrwmap_output" data-id="ikrwmap_output">
        <?php 
        include_once(IKRWMAP_ROBIN_DIR_PATH_WORLD . '/views/tooltip.php');
        ?>
        <!-- <object class="svg_img_obj" data="<?php echo esc_url( plugins_url( "../assets/images/worldmap.svg", __FILE__ ) ); ?>"></object> -->
    </div>
    <?php
    // Get the buffered output and clean (flush) the buffer
    return ob_get_clean();
}

// Register the shortcode
add_shortcode('ikr_world_map', 'ikrwmap_shortcode_function');

?>
