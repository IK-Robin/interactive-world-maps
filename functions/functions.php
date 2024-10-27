<?php
// add scripts on map plugin
function add_rdat_scripts()
{

    $ikr_world_map_current_screen = get_current_screen();



    if ($ikr_world_map_current_screen->base == "toplevel_page_interactive-world-map-robin") {
        wp_enqueue_script('from_submit', plugin_dir_url(__FILE__) . '../assets/js/ikrgeo-interactivity.js', array(), '1.0.1', true);

        // wp_enqueue_script('featch_data_from_server',plugin_dir_url(__FILE__) . '../assets/js/your-custom.js');
        wp_enqueue_script('featch_data_from_server', plugin_dir_url(__FILE__) . '../assets/js/worldmap-global.js');

        wp_enqueue_script(
            'bootstrapJs-proper',
            'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js',
            array(),
            '2.9.2',
            true // Load in footer
        );
        wp_enqueue_script(
            'robinbootstrapJs-main',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
            array(),
            '2.9.2',
            true // Load in footer
        );



        wp_localize_script(
            'from_submit',
            'your_ajax_object',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'action' => 'rdata_save_data_add',
                "feacth" => "rdata_fetch_data",
                "edit_data" => "ikr_world_map_edit",
                "delete_data" => "ikr_world_mapDelete",

            )
        );
    }
}


add_action('admin_enqueue_scripts', 'add_rdat_scripts');


// add style 
function add_world_map_enqueue_style()
{


    $ikr_world_map_current_screen = get_current_screen();


    if ($ikr_world_map_current_screen->base == "toplevel_page_interactive-world-map-robin") {
        wp_enqueue_style('robingeo_enqueue_styel', plugin_dir_url(__FILE__) . '../assets/style/style.css', array(), '1.0.1', 'all');
        wp_enqueue_style(
            'ikr_bootstrap_css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
            array(),
            '5.0.2'
        );
    }
}

add_action('admin_enqueue_scripts', 'add_world_map_enqueue_style');




function rdata_add_admin_menu_page()
{


?>
    <div class="robingeo-container">

        <div class="map_container">
            <div class="map-img">

                <?php
                include_once ROBIN_DIR_PATH_WORLD . './views/world-map.php';
                // 
                ?>
            </div>
            <div class="map-data-show">
                <?php
                include_once ROBIN_DIR_PATH_WORLD . './views/show-map-data.php';
                ?>
            </div>
        </div>


        <div class="input-form">
            <?php

            include_once ROBIN_DIR_PATH_WORLD . './views/from-data.php';
            ?>
        </div>
    </div>
<?php












}



function rdata_save_data_add()
{
    global $wpdb;

    // Retrieve the form data
    $id = isset($_POST['id']) ? sanitize_text_field($_POST['id']) : '';

    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $des = isset($_POST['des']) ? sanitize_text_field($_POST['des']) : '';
    $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';
    $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field($_POST['fillcolor']) : '';
    $click_color = isset($_POST['clickcolor']) ? sanitize_text_field($_POST['clickcolor']) : '';

    // Insert the data into the database
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    //  add data from data base 

    $wpdb->insert(
        $table_name,
        array(
            'map_id' => $id,
            'title' => $title,
            'map_des' => $des,
            'hov_color' => $hov_color,
            'fill_color' => $fill_colors,
            'click_color' => $click_color,
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
add_action('wp_ajax_rdata_save_data_add', 'rdata_save_data_add');
add_action('wp_ajax_nopriv_rdata_save_data_add', 'rdata_save_data_add');


// create a function to edit the data from db 


function ikr_world_map_edit()
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


            // Specify the table name with WordPress prefix
            $table_name = $wpdb->prefix . 'interactive_geo_maps';


            $cache_key = 'state_' . $id;
            // Clear the cache before the update to avoid stale data
            wp_cache_delete($cache_key);


            // Perform the database update
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery


            // Update the table with the new data
            $updated = $wpdb->update(
                $table_name,
                [
                    'title' => $title,
                    'map_des' => $des,
                    'hov_color' => $hov_color,
                    'fill_color' => $fill_colors,
                ],
                [
                    'map_id' => $id,
                ],
                [
                    '%s', // data type for 'title'
                    '%s', // data type for 'map_des'
                    '%s', // data type for 'hov_color'
                    '%s'  // data type for 'fill_color'
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
                $result = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE map_id = %s", $id));

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

add_action('wp_ajax_ikr_world_map_edit', 'ikr_world_map_edit');
add_action('wp_ajax_noprive_ikr_world_map_edit', 'ikr_world_map_edit');




//  get data from data base 
// AJAX callback to fetch data from the database
function rdata_fetch_data_from_database()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    // Retrieve data from the database
    $data = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Return the response
    wp_send_json_success($data);
}
add_action('wp_ajax_rdata_fetch_data', 'rdata_fetch_data_from_database');
add_action('wp_ajax_nopriv_rdata_fetch_data', 'rdata_fetch_data_from_database');
