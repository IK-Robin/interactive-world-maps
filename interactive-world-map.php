<?php /**
 
 * Plugin Name:       interactive world map plugin     
 * Plugin URI:        https://wordpress.org/plugins/search/interactive-geo-maps-wp/
 * Description:       INteractive world map plugin for WordPress. 
 * Version:           1.0.0
 * Author:            IK Robin
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.robin.org/licenses/gpl-2.0.txt
 * Text Domain:       interactiveworld-map
 * Domain Path:       /languages
 */

 


if ( ! defined( 'IKRWMAP_ROBIN_DIR_PATH_WORLD' ) ) {
   define( 'IKRWMAP_ROBIN_DIR_PATH_WORLD', plugin_dir_path( __FILE__ ) );
}

include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './functions/functions.php';
function rdata_add_menu_page()
{
   add_menu_page('interactive-world-map-robin', 'interactive-world-map-robin', 'manage_options', 'interactive-world-map-robin', 'ikrwmap_rdata_add_admin_menu_page', '', 101);
   add_submenu_page('interactive-world-map-robin', 'Dashbord', 'interactive world map', 'manage_options', 'interactive-world-map-robin', '', 'ikrwmap_rdata_add_admin_menu_page');

   // add show data submenu 
   add_submenu_page('interactive-world-map-robin', 'map-data', 'map-data', 'manage_options', 'interactive-world-map-robin', 'rdata_add_show_data', 101);


}


add_action('admin_menu', 'rdata_add_menu_page');




function rdata_add_show_data()
{

   ?>
   <h1> show from data</h1>
  


<?php  include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . '/views/show_data.php' ?>


   <?php

   // include_once ROBIN_DIR_PATH_WORLD. './views/show-form-data.php';
   ?>



   

   <?php

}


include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './includes/db.php';

register_activation_hook( __FILE__, 'rdata_plugin_create_tables' );


?>

