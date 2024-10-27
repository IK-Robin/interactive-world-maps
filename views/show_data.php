<!-- Modal -->
<div class="modal fade" id="ikr_map_data_edit" tabindex="-1" aria-labelledby="ikr_map_data_editLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ikr_map_data_editLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form action="" id="rdata_from_edit" class="ikr_form_style">

        <?php wp_nonce_field('w_map_form_action', 'w_map_form_nonce'); ?>

          <div id="data-entries container">
            <div class=" row">
              <div class="col-md-6"> <label for="id">Map ID</label>
                <input type="text" name="id" class="scratch-data-id" id="modal_map_id" />
                <label class="ikr_form_label" for="title">Title</label>
                
                <input type="text" name="title" placeholder="Insert your title" id="modal_ikrTitle" />

                <label class="ikr_form_label" for="des">Description</label>

                <input type="text" name="des" id="modal_ikrdes" placeholder="Insert your description" />

                <label class="ikr_form_label" for="hovecolor">Hover Color</label>

                <div class="ikr_color_inp d-flex justify-content-center position-relative ">


                  <input type="text" name="hovecolor" id="modal_hovecolor" value="#0000FF" class="ikr_w_hovecolor" />
                  
                  <input type="color" id="modal_typeHovcolor" class="ikr_w_typehove  shadow-none " name="hovecolor" value="#0000FF" />

                </div>



              </div>


              <div class="col-md-6">

                <label class="ikr_form_label" for="fill_color">Fill Color</label>

                <div class="ikr_color_inp d-flex justify-content-center position-relative ">

                  <input type="text" class="ikr_w_hovecolor" name="fillcolor" id="modal_fill_color" value="#0000FF" />

                  <input type="color" id="modal_filltype" value="#0000FF" class="ikr_w_typehove shadow-none" />

                </div>


                <label class="ikr_form_label" for="modal_ikr_img" class="d-block"> image</label>

                <div class="ikr_color_inp d-flex justify-content-center position-relative ">

                  <input type="text" name="modal_ikr_img" id="modal_ikr_img" placeholder="" />
                  <input type="button" value="Slect Image" class="ikr_select_img btn btn-primary ‍ shadow-none" id="modal_ikr_select_img">
                </div>
                <label class="ikr_form_label" for="modal_link">Website url</label>

                <input type="text" name="modal_link" id="modal_link_edit" placeholder="http://google.com" />


              </div>





            </div>
          </div>



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit " class="btn btn-primary">Save changes</button>


        </form>
      </div>
    </div>
  </div>
</div>


<!-- Table for Displaying Entries -->
<table id="mapTable" border="1" class="table mt-4 table">
  <thead>
    <tr>
      <th>#</th>
      <th>Map ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Hover Color</th>
      <th>Fill Color</th>
      
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <!-- Rows will be populated by JavaScript -->
  </tbody>
</table>
<script>
    const deleteNonce = "<?php echo wp_create_nonce('w_map_form_delete_action'); ?>";
</script>
