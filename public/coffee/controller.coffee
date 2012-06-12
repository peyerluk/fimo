@fimo.controller = do ->
  data = @fimo.data
  views = @fimo.views
  $page = $("#page")

  onPhotoDataFail = ->
    alert("could not get photo data")
    
  onPhotoDataSuccess = (imageURI) ->
    alert("retrieved photo data")
  
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
      
