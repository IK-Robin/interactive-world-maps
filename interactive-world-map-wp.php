<?php

/**
 
<<<<<<< HEAD:interactive-world-map-wp.php
 * Plugin Name:       Interactive World Maps WP
 * Plugin URI:        https://wordpress.org/plugins/interactive-world-maps-wp/
 * Description:       INteractive world map plugin for WordPress. 
 * Version:           1.0.0
 * Author:            IK Robin
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.robin.org/licenses/gpl-2.0.txt
=======
 * Plugin Name:       Interactive World Maps
 * Plugin URI:        https://wordpress.org/plugins/interactive-world-maps/
 * Description:       INteractive world map plugin for WordPress. 
 * Version:           1.0.0
 * Author:            IK Robin
 * Author URI:        https://www.linkedin.com/in/ik-robin-0b52301a4/
 * Requires at least: 5.8
 * Requires PHP: 5.6.20

>>>>>>> ef32f75b447c41d2c7d5d5d411a9f32248ef6442:interactive-world-map.php
 * Text Domain:       interactive-world-maps
 * Domain Path:       /languages
 * License: GPLv2 or later
 */




if (! defined('IKRWMAP_ROBIN_DIR_PATH_WORLD')) {
   define('IKRWMAP_ROBIN_DIR_PATH_WORLD', plugin_dir_path(__FILE__));
}

include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './functions/functions.php';
function ikrwmap_add_menu_page()
{
   add_menu_page('interactive-world-maps-wp', 'world-maps', 'manage_options', 'interactive-world-maps-wp', 'ikrwmap_ikrwmap_add_admin_menu_page', '', 101);
   add_submenu_page('interactive-world-maps-wp', 'Dashboard', 'Dashboard', 'manage_options', 'interactive-world-maps-wp', '', 'ikrwmap_ikrwmap_add_admin_menu_page');

   // add show data submenu 
<<<<<<< HEAD:interactive-world-map-wp.php
   add_submenu_page('interactive-world-maps-wp', 'Map Shortcode', 'Map Shortcode', 'manage_options', 'interactive-world-maps-wp-shortcode', 'ikrwmap_add_show_data', 101);


=======
   add_submenu_page('interactive-world-maps', 'Map Shortcode', 'Map Shortcode', 'manage_options', 'interactive-world-maps-shortcode', 'ikrwmap_add_show_data', 101);
>>>>>>> ef32f75b447c41d2c7d5d5d411a9f32248ef6442:interactive-world-map.php
}


add_action('admin_menu', 'ikrwmap_add_menu_page');




function ikrwmap_add_show_data()
{

<<<<<<< HEAD:interactive-world-map-wp.php
   ?>
   <h1> Map Shortcode</h1>
  <br>
  <h3>Copy the Shortcode and past it in your page or post</h3>
  <br>
<h1> <strong>Shortcode = </strong> [ikr_world_map]</h1>
=======
?>
   <h1> Map Shortcode</h1>
   <br>
   <h3>Copy the Shortcode and past it in your page or post</h3>
   <br>
   <h1> <strong>Shortcode = </strong> [ikr_world_map]</h1>
>>>>>>> ef32f75b447c41d2c7d5d5d411a9f32248ef6442:interactive-world-map.php



   <?php

   // include_once ROBIN_DIR_PATH_WORLD. './views/show-form-data.php';
   ?>





<?php

}


include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './includes/db.php';

register_activation_hook(__FILE__, 'ikrwmap_plugin_create_tables');


?>