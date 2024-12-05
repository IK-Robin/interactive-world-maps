<?php

/**
 
 * Plugin Name:       Interactive World Maps
 * Plugin URI:        https://wordpress.org/plugins/interactive-world-maps/
 * Description:       INteractive world map plugin for WordPress. 
 * Version:           1.0.0
 * Author:            IK Robin
 * Author URI:        https://www.linkedin.com/in/ik-robin-0b52301a4/
 * Requires at least: 5.8
 * Requires PHP: 5.6.20

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
   add_menu_page('interactive-world-maps', 'world-maps', 'manage_options', 'interactive-world-maps', 'ikrwmap_ikrwmap_add_admin_menu_page', '', 101);
   add_submenu_page('interactive-world-maps', 'Dashboard', 'Dashboard', 'manage_options', 'interactive-world-maps', '', 'ikrwmap_ikrwmap_add_admin_menu_page');

   // add show data submenu 
   add_submenu_page('interactive-world-maps', 'Map Shortcode', 'Map Shortcode', 'manage_options', 'interactive-world-maps-shortcode', 'ikrwmap_add_show_data', 101);
}


add_action('admin_menu', 'ikrwmap_add_menu_page');




function ikrwmap_add_show_data()
{

?>
   <h1> Map Shortcode</h1>
   <br>
   <h3>Copy the Shortcode and past it in your page or post</h3>
   <br>
   <h1> <strong>Shortcode = </strong> [ikr_world_map]</h1>



   <?php

   // include_once ROBIN_DIR_PATH_WORLD. './views/show-form-data.php';
   ?>





<?php

}


include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './includes/db.php';

register_activation_hook(__FILE__, 'ikrwmap_plugin_create_tables');


?>