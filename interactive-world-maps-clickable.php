<?php

/**
 

 * Plugin Name:       Interactive World Maps Clickable
 * Plugin URI:        https://wordpress.org/plugins/interactive-world-maps-clickable/
 * Description:       INteractive world map plugin for WordPress. 
 * Version:           1.0.0
 * Author:            IK Robin
 * Author URI:        https://www.linkedin.com/in/ik-robin-0b52301a4/
 * License:           GPL-2.0+
* License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       interactive-world-maps-clickable
 * Domain Path:       /languages
 * License: GPLv2 or later
 */

 if ( ! defined( 'ABSPATH' ) ) exit;



if (! defined('IKRWMAP_ROBIN_DIR_PATH_WORLD')) {
   define('IKRWMAP_ROBIN_DIR_PATH_WORLD', plugin_dir_path(__FILE__));
}

include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './functions/functions.php';
function ikrwmap_add_menu_page()
{
   add_menu_page('interactive-world-maps-clickable', 'World-Maps', 'manage_options', 'interactive-world-maps-clickable', 'ikrwmap_ikrwmap_add_admin_menu_page','dashicons-admin-site', 11);
   add_submenu_page('interactive-world-maps-clickable', 'Dashboard', 'Dashboard', 'manage_options', 'interactive-world-maps-clickable','', 'ikrwmap_ikrwmap_add_admin_menu_page');

   // add show data submenu 
   add_submenu_page('interactive-world-maps-clickable', 'Map Shortcode', 'Map Shortcode', 'manage_options', 'interactive-world-maps-clickable-shortcode', 'ikrwmap_add_show_data', 11);


}


add_action('admin_menu', 'ikrwmap_add_menu_page');




function ikrwmap_add_show_data()
{

   ?>
   <h1> Map Shortcode</h1>
  <br>
  <h3>Copy the Shortcode and past it in your page or post</h3>
  <br>
<h1> <strong>Shortcode = </strong> [ikrwmap_world_map]</h1>



   <?php

   // include_once ROBIN_DIR_PATH_WORLD. './views/show-form-data.php';
   ?>





<?php

}


include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './includes/db.php';

register_activation_hook(__FILE__, 'ikrwmap_plugin_create_tables');


?>