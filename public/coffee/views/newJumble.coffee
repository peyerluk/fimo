@fimo.views.add "newJumble", ->
  
  template: _.template(
    """
    <form id="newJumbleForm">
      <label>Your jumble</label>
      <input type="text" name="name" placeholder="Name your jumble" id="name" />
      <img src="http://upfront.io/assets/logo/logo-1.png" id="previewImage" style="display:none;"/><br/>
      <a href="" id="imageLink">Take an image</a><br/>
      <legend>What's it about? (optional)</legend>
      <input type="text" name="tags" placeholder="Add #tag" id="tags" />
      <br/>
      <button type="submit" class="btn">next step</button>
    </form>
    """
  )
  
  
  onPhotoUploadFail: (error) ->
    alert("got error code on photo upload #{error.code}")
    
  onPhotoUploadSuccess: (res) ->
    alert res.response
    jsonResponse = JSON.parse(unescape(res.response))
    #$('#previewImage').src = jsonResponse.imageURL
    $('#previewImage').show()
    #page.create(views.newObject({ url: "" + hostname + "/objects/create", imageUrl: jsonResponse.imageUrl, imageId: jsonResponse.imageId }))
  
  
  onPhotoDataSuccess: (imageURI) ->
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    ft = new FileTransfer
    
    ft.upload(imageURI,  "#{fimo.hostname}/upload", @onPhotoUploadSuccess, @onPhotoUploadFail, options)
    undefined
    
  onPhotoDataFail: ->
    alert("failed")
    false  
  
  loaded: ->
    $('#imageLink').click =>
      fimo.device.ready =>
        #alert("taking a picture with navigator " + navigator.camera)
        navigator.camera.getPicture @onPhotoDataSuccess, @onPhotoDataFail,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          quality: 50
        false
      false
    #           
    # $('#newJumbleForm').submit =>
    #   #fimo.data.post 'objects/create', { imageId: @instanceArguments['imageId'], verbs: $('#verbs').val(), tags: $('#tags').val() }, =>
    #     # TODO: route to object view
    #   #  fimo.controller.jumbles()
    #   #, ->
    #   #  $('.alert-error').show()
    #     
    #   false
      
  destroy: ->
    console.log("destroyed jumbles#new}")