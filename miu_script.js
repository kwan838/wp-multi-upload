jQuery(document).ready(function(){
    
    jQuery('.miu-remove').live( "click", function(e) {
        e.preventDefault();
        var id = jQuery(this).attr("id")
        var btn = id.split("-");
        var img_id = btn[1];
        jQuery("#row-"+img_id ).remove();
    });
    
    
    window.formfield;
    window.img_id;

    // Create the media frame.
    var items_frame = wp.media.frames.items = wp.media({
        multiple: 'add',
        frame: 'post',
        library: {type: 'image'}
    });

    items_frame.on('insert', function(e) {
        //console.log(e);
        var uploadImages = jQuery.extend(true, {}, e);
        uploadImages = uploadImages.models;
        jQuery.each(uploadImages, function(index, value){
            var imageUrl = value["attributes"]['url'];
            addRow(imageUrl, "");
        });
    });

    

    // jQuery('.Image_button').live( "click", function(e) {
    //     e.preventDefault();
    //     var id = jQuery(this).attr("id")
    //     var btn = id.split("-");
    //     img_id = btn[1];
        
    //     jQuery('html').addClass('Image');
    //     formfield = jQuery('#img-'+img_id).attr('name');
    //     tb_show('', 'media-upload.php?type=image&TB_iframe=true');
         
    // });

    jQuery('.multi_btn').click(function(e){
        e.preventDefault();
        // If the media frame already exists, reopen it.
        if ( items_frame ) {
            items_frame.open();
            return;
        }

        // Finally, open the modal.
        items_frame.open();

        return false;
    })
	
    // window.original_send_to_editor = window.send_to_editor;
    // window.send_to_editor = function(html){
    //     //console.log(formfield);
    //     if (formfield) {
    //         fileurl = jQuery(html).find("img").attr('src');
    //         console.log(html);
    //         jQuery('#img-'+img_id +', #img-show-'+img_id).val(fileurl);
    //         var thumb = '<img width="25" src="'+fileurl+'">';
    //         jQuery('#miu_images '+'#row-'+img_id+' span').html(thumb);
    //         tb_remove();
    //         jQuery('html').removeClass('Image');
    //     } else {
    //         window.original_send_to_editor(html);
    //     }
    // };
});

function addRow(image_url, image_title){
    if(typeof(image_url)==='undefined') image_url = "";
    if(typeof(image_title)==='undefined') image_title = "";
    itemsCount+=1;
    var emptyRowTemplate = '<div id=row-'+itemsCount+'> <input style=\'float:left;width:70%\' id=img-show-'+itemsCount+' type=\'text\' value=\''+image_url+'\' disabled />'
    +'<input style=\'float:left;width:70%\' id=img-'+itemsCount+' type=\'hidden\' name=\'miu_images['+itemsCount+']\' value=\''+image_url+'\' />'
    //+'&nbsp;<input type=\'button\' href=\'#\' class=\'Image_button button\' id=\'Image_button-'+itemsCount+'\' value=\'Upload\'>'
    +'&nbsp;<input class="miu-remove button" type=\'button\' value=\'Remove\' id=\'remove-'+itemsCount+'\' />'
    +'&nbsp;<span>';
    if(image_url)
    {
      emptyRowTemplate+= '<img width="25" src="'+image_url+'">';

    }
    emptyRowTemplate+='</span>'
    +'<br><input style=\'width:80%\' class=\'image_title\' id=img-txt-'+itemsCount+' type=\'text\' name=\'miu_images_title['+itemsCount+']\' value=\''+image_title+'\' />'
    +'</div>';
    jQuery('#miu_images').append(emptyRowTemplate);
}