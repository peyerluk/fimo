@fimo.controller = do ->
  data = @fimo.data
  views = @fimo.views
  $page = $("#page")

  onPhotoDataFail = ->
    alert("could not get photo data")
  
  onPhotoUploadFail = (error) ->
    alert("got error code on photo upload #{error.code}")
    
  onPhotoDataSuccess = (imageURI) ->
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    
    ft = new FileTransfer
    ft.upload(imageURI, "http://172.21.21.52:3000/upload", onPhotoUploadSuccess, onPhotoUploadFail, options)
  
  onPhotoUploadSuccess = (res) ->
    alert("got response code: #{res.repsonseCode}")
  
  wall: ->
    fimo.data.load "wall", (page) ->
      $page.html(views.wall({ images : page.images }))
  
  profile: ->
    fimo.data.load "profile", (page) ->
      $page.html(views.profile({ username : page.username }))
      
  add: ->
    fimo.device.ready ->
      pictureSource = Camera.PictureSourceType['PHOTOLIBRARY']
      destinationType = Camera.DestinationType.FILE_URI
      navigator.camera.getPicture onPhotoDataSuccess, onPhotoDataFail,
        quality: 50, 
        allowEdit: true,
        destinationType: destinationType,
        sourceType: pictureSource
      
