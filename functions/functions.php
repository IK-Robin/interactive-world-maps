<?php

// add shortcode in the plugin 

include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './includes/ikrwmap_shortcode.php';



// add scripts on map plugin
function ikrwmap_add_rdat_scripts()
{

    $ikr_world_map_current_screen = get_current_screen();



    if ($ikr_world_map_current_screen->base == "toplevel_page_interactive-world-maps-wp") {
        wp_enqueue_script('from_submit', plugin_dir_url(__FILE__) . '../assets/js/ikrgeo-interactivity.js', array(), '1.0.1', true);

        // wp_enqueue_script('featch_data_from_server',plugin_dir_url(__FILE__) . '../assets/js/your-custom.js');
        wp_enqueue_media();
        wp_enqueue_script('featch_data_from_server', plugin_dir_url(__FILE__) . '../assets/js/worldmap-global.js',[],'1.0.1',false);
        wp_enqueue_script('add_ikrwmap_image', plugin_dir_url(__FILE__) . '../assets/js/ikrwmap-images.js',[],'1.0.1',true);

        // wp_enqueue_script(
        //     'bootstrapJs-proper',
        //     'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js',
        //     array(),
        //     '2.9.2',
        //     true // Load in footer
        // );
        wp_enqueue_script(
            'robinbootstrapJs-main', plugin_dir_url(__FILE__) . '../assets/js/ikrwmap-bootstrap.js',
            array(),
            '2.9.2',
            true // Load in footer
        );



        wp_localize_script(
            'from_submit',
            'your_ajax_object',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'action' => 'ikrwmap_save_data_add',
                "feacth" => "ikrwmap_retrieveData_from_db",
                "edit_data" => "ikrwmap_data_edit",
                "delete_data" => "ikr_world_mapDelete",

            )
        );
    }
}


add_action('admin_enqueue_scripts', 'ikrwmap_add_rdat_scripts');


// add style 
function ikrwmap_add_world_map_add_style()
{


    $ikr_world_map_current_screen = get_current_screen();


    if ($ikr_world_map_current_screen->base == "toplevel_page_interactive-world-maps-wp") {
        wp_enqueue_style('robingeo_enqueue_styel', plugin_dir_url(__FILE__) . '../assets/style/style.css', array(), '1.0.1', 'all');
        wp_enqueue_style(
            'ikr_bootstrap_css',
 plugin_dir_url(__FILE__) . '../assets/style/ikrwmap-bootstrap.css',
            array(),
            '5.0.2'
        );
    }
}

add_action('admin_enqueue_scripts', 'ikrwmap_add_world_map_add_style');



// add front end script 

function ikrwmap_add_frontend_script()
{



    // Enqueue the script
    if (is_single() && has_shortcode(get_the_content(), 'ikr_world_map')) {

        // Enqueue Leaflet JS directly from CDN
        wp_enqueue_script('ikrwmap-fontend-script', plugin_dir_url(__FILE__) . '../assets/js/ikrwmap-fontend-script.js', array(), '1.0.1', true);

        wp_enqueue_script('add_ikrwmap_image_frontend', plugin_dir_url(__FILE__) . '../assets/js/ikrwmap-images.js',[],'1.0.1',false);

        wp_localize_script('ikrwmap-fontend-script', 'ikrwmap_get_url', [
            'featchdata' => 'ikrwmap_retrieveData_from_db',
            'ajax_url' => admin_url('admin-ajax.php'),

        ]);
        wp_enqueue_style('ikrwmap_frontend_css', plugin_dir_url(__FILE__) . '../assets/style/ikrwmap-fontend-style.css', [], '1.0.1', 'all');
    }
}
// Hook the function to the appropriate action
add_action('wp_enqueue_scripts', 'ikrwmap_add_frontend_script');


function ikrwmap_ikrwmap_add_admin_menu_page()
{



?>
    <div class="robingeo-container">

        <div class="map_container">
            <div class="map-img">

                <?php
                include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './views/world-map.php';
                // 
                ?>
            </div>
            <div class="map-data-show">
                <?php
                include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './views/show-map-data.php';
                ?>
            </div>
            <div id="successMessage" class="hidden">Form submitted successfully!</div>
            
        </div>


        <div class="input-form">
            <?php

            include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . './views/from-data.php';
            ?>
            
        </div>
        
    </div>
    
   <h1> show from data</h1>
  


<?php  include_once IKRWMAP_ROBIN_DIR_PATH_WORLD . '/views/show_data.php' ?>


   <?php

   // include_once ROBIN_DIR_PATH_WORLD. './views/show-form-data.php';
   ?>
<?php




}



function ikrwmap_save_data_add()
{
if (isset($_POST)){

    if (!isset($_POST['w_map_form_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['w_map_form_nonce'])), 'w_map_form_action')) {
        wp_die('Security check failed.');
    }

}

    global $wpdb;

 


    // Retrieve the form data
    $id = isset($_POST['id']) ? sanitize_text_field(wp_unslash($_POST['id'])) : '';
    

    $title = isset($_POST['title']) ? sanitize_text_field(wp_unslash($_POST['title'])) : '';
    $des = isset($_POST['des']) ? sanitize_text_field(wp_unslash($_POST['des'])) : '';
    $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field(wp_unslash($_POST['hovecolor'])) : '';
    $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field(wp_unslash($_POST['fillcolor'])) : '';
    $click_color = isset($_POST['clickcolor']) ? sanitize_text_field(wp_unslash($_POST['clickcolor'])) : '';
    $modal_ikr_img = isset($_POST['modal_ikr_img']) ? sanitize_url(wp_unslash(($_POST['modal_ikr_img']))) : '';
    $map_link = isset($_POST['modal_link']) ? sanitize_url(wp_unslash($_POST['modal_link'])) : '';




    // Insert the data into the database
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    //  add data from data base 
  // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
    $wpdb->insert(
        $table_name,
        array(
            'map_id' => $id,
            'title' => $title,
            'map_des' => $des,
            'hov_color' => $hov_color,
            'fill_color' => $fill_colors,
            'click_color' => $click_color,
            'map_img' => $modal_ikr_img,
            'map_link' => $map_link
        )
    );

    // Return the response
    if ($wpdb->insert_id) {
        wp_send_json_success('Data saved successfully.');
    } else {
        wp_send_json_error('Failed to save form data.');
    }


    // Check if the number of rows is less than 7
    // $num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    //  if ($num_rows < 9) {

    // } else {
    //     wp_send_json_error('All fields are full. Cannot add more data. To Add More data go to Prow');
    // }

    // Return the response
    //  wp_send_json_success('Data saved successfully.');
}
add_action('wp_ajax_ikrwmap_save_data_add', 'ikrwmap_save_data_add');
add_action('wp_ajax_nopriv_ikrwmap_save_data_add', 'ikrwmap_save_data_add');


// create a function to edit the data from db 


function ikrwmap_data_edit()
{

    if (isset($_POST)) {
        // veryfy nonce 

        if (isset($_POST['w_map_form_nonce']) && wp_verify_nonce(sanitize_key($_POST['w_map_form_nonce']), esc_html('w_map_form_action'))) {

            global $wpdb;

            //    get all input and sanitizw it 

            /// Retrieve and clean form data with wp_unslash and sanitize_text_field
            $id = isset($_POST['id']) ? sanitize_text_field(wp_unslash($_POST['id'])) : '';
            $title = isset($_POST['title']) ? sanitize_text_field(wp_unslash($_POST['title'])) : '';
            $des = isset($_POST['des']) ? sanitize_text_field(wp_unslash($_POST['des'])) : '';
            $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field(wp_unslash($_POST['hovecolor'])) : '';
            $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field(wp_unslash($_POST['fillcolor'])) : '';
            $modal_ikr_img = isset($_POST['modal_ikr_img']) ? sanitize_url(wp_unslash($_POST['modal_ikr_img'])) : '';
            $map_link = isset($_POST['modal_link']) ? sanitize_url(wp_unslash($_POST['modal_link'])) : '';



            // Specify the table name with WordPress prefix
            $table_name = $wpdb->prefix . 'interactive_geo_maps';


            $cache_key = 'state_' . $id;
            // Clear the cache before the update to avoid stale data
            wp_cache_delete($cache_key);


            // Perform the database update
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery


            // Update the table with the new data
              // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
            $updated = $wpdb->update(
                $table_name,
                [
                    'title' => $title,
                    'map_des' => $des,
                    'hov_color' => $hov_color,
                    'fill_color' => $fill_colors,
                    'map_img' => $modal_ikr_img,
                    'map_link' => $map_link
                ],
                [
                    'map_id' => $id,
                ],
                [
                    '%s', // data type for 'title'
                    '%s', // data type for 'map_des'
                    '%s', // data type for 'hov_color'
                    '%s', // data type for 'fill_color'
                    '%s',  // data type for 'fill_color'
                    '%s', // data type for 'fill_color'
                ],
                [
                    '%s' // data type for 'map_id'
                ]
            );


            // Define cache key for the data

            $result = wp_cache_get($cache_key);

            if ($result === false) {
                // If the result is not cached, perform the database query
                // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
                $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM  $table_name WHERE map_id = %s",  $id));

                if ($result) {
                    // Cache the updated marker data
                    wp_cache_set($cache_key, $result);
                }
            }

            // Return the response
            if ($updated !== false) { // Check if the update was successful
                wp_send_json_success('Data updated successfully.');
            } else {
                wp_send_json_error('Failed to update form data.');
            }
        }
    }
}

add_action('wp_ajax_ikrwmap_data_edit', 'ikrwmap_data_edit');
add_action('wp_ajax_noprive_ikrwmap_data_edit', 'ikrwmap_data_edit');

// add delete functionality 

function ikr_world_mapDelete()
{
    global $wpdb;

    if (isset($_POST['w_map_form_delete_nonce']) && wp_verify_nonce(sanitize_key($_POST['w_map_form_delete_nonce']), 'w_map_form_delete_action')) {
        // Sanitize and retrieve map_id from the POST request
        $map_id = isset($_POST['map_id']) ? sanitize_text_field(wp_unslash($_POST['map_id'])) : '';

        // Define table name and cache key
        $table_name = $wpdb->prefix . 'interactive_geo_maps';
        $cache_key = 'map_data_' . $map_id;

        // Attempt to retrieve cached data
        $result = wp_cache_get($cache_key);

        if ($result === false) {
            // If no cached result, query the database
              // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
            $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM  $table_name WHERE map_id = %s", $map_id));

            if ($result) {
                // Cache the result
                wp_cache_set($cache_key, $result);
            }
        }

        // Proceed with deletion if data exists
        if ($result) {
              // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
            $deleted = $wpdb->delete($table_name, ['map_id' => $map_id], ['%s']);

            if ($deleted) {
                // Clear the cache after deletion
                wp_cache_delete($cache_key);

                // Send success response
                wp_send_json_success('Map data deleted successfully.');
            } else {
                wp_send_json_error('Failed to delete map data.');
            }
        } else {
            wp_send_json_error('Map data not found.');
        }
    } else {
        wp_send_json_error('Invalid nonce.');
    }
}


add_action('wp_ajax_ikr_world_mapDelete', 'ikr_world_mapDelete');
add_action('wp_ajax_noprive_ikr_world_mapDelete', 'ikr_world_mapDelete');



//  get data from data base 
// AJAX callback to fetch data from the database
function ikrwmap_retrieveData_from_db_from_database() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    // Cache key for this query
    $cache_key = 'ikrwmap_interactive_geo_maps_data';

    // Try to fetch cached data
    $data = wp_cache_get($cache_key, 'ikrwmap');

    // If no cached data exists, fetch fresh data and cache it
    if (false === $data) {
        // Fetch data from the database
        $query = "SELECT * FROM `$table_name`";
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
        $data = $wpdb->get_results($query, ARRAY_A);

        // Store the result in the cache
        wp_cache_set($cache_key, $data, 'ikrwmap', 3600); // Cache for 1 hour
    }

    // Return the response
    wp_send_json_success($data);
}
add_action('wp_ajax_ikrwmap_retrieveData_from_db', 'ikrwmap_retrieveData_from_db_from_database');
add_action('wp_ajax_nopriv_ikrwmap_retrieveData_from_db', 'ikrwmap_retrieveData_from_db_from_database');

