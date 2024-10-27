<?php
?>

<h1>Add to DB</h1>
<form action="" id="rdata_from" class="ikr_form_style">
    <?php wp_nonce_field('w_map_form_action', 'w_map_form_nonce'); ?>

    <div id="data-entries">
        <div class="data-entry">
            <label for="id">Map ID</label>
            <input type="text" name="id" class="scratch-data-id" id="map_id" />
            <label for="title">Title</label>
            <input type="text" name="title" placeholder="Insert your title" id="ikrTitle" />
            <label for="des">Description</label>
            
            <input type="text" name="des" id="ikrdes" placeholder="Insert your description" />

            <label for="hovecolor">Hover Color</label>

            <div class="ikr_color_inp d-flex justify-content-center position-relative ">
                
                <input type="color" id="typeHovcolor" value="#0000FF" class="ikr_w_typehove shadow-none" />

                <input type="text" name="hovecolor" id="hovecolor" value="#0000FF" />

            </div>
            <label for="fill_color">Fill Color</label>
            <div class="ikr_color_inp d-flex justify-content-center position-relative ">

                <input type="color" id="filltype" value="#0000FF" class="ikr_w_typehove shadow-none" />

                <input type="text" name="fillcolor" id="fill_color" value="#0000FF" class="ikr_w_hovecolor" />

            </div>



            <label class="ikr_form_label" for="modal_ikr_img" class="d-block"> image</label>

            <div class="ikr_color_inp d-flex justify-content-center position-relative ">

                <input type="text" name="modal_ikr_img" id="modal_ikr_img" placeholder="" />
                <input type="button" value="Slect Image" class="ikr_select_img btn btn-primary shadow-none" id="ikr_select_img">
            </div>
            <label class="ikr_form_label" for="modal_link">Website url</label>

            <input type="text" name="modal_link" id="modal_link" placeholder="http://google.com" />



            <input id="rdata_submit_form" type="submit" value="Submit" class="btn btn-primary" />
        </div>
    </div>

</form>







<?php




// function scratch_save_data_add()
//     {
//         global $wpdb;

//         // Retrieve the form data
//         $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
//         $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
//         $des = isset($_POST['des']) ? sanitize_text_field($_POST['des']) : '';
//         $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';

//         // Insert the data into the database
//         $table_name = $wpdb->prefix . 'data_table';
//         $wpdb->insert(
//             $table_name,
//             array(
//                 'id' => $id,
//                 // 'title' => $title,
//                 'des' => $des,
//                 'hov_color' => $hov_color
//             )
//         );

//         // Return the response
//         wp_send_json_success('Data saved successfully.');
//     }
//     add_action('wp_ajax_scratch_save_data_add', 'scratch_save_data_add');
//     add_action('wp_ajax_nopriv_scratch_save_data_add', 'scratch_save_data_add');



// Enqueue scripts





// Save data to the database

?>