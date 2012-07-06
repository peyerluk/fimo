@fimo.controller = do ->
  data = @fimo.data
  views = @fimo.views
  page = @fimo.page

  onPhotoDataFail = ->
    alert("could not get photo data")
  
  onPhotoUploadFail = (error) ->
    alert("got error code on photo upload #{error.code}")
    
  onPhotoUploadSuccess = (res) ->
    alert("uploaded photo data")
    #alert("got response code: #{res.repsonseCode}")
    
  onPhotoDataSuccess = (imageURI) ->
    alert("got photo data: #{imageURI}")
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    ft = new FileTransfer
    ft.upload(imageURI, @fimo.hostname + "/upload", onPhotoUploadSuccess, onPhotoUploadFail, options)
  
  wall: ->
    fimo.data.load "wall", (content) ->
      page.create(views.wall({ images : content.images }))
  
  image: (id) ->
    fimo.data.load "image?id=#{ id }", (content) ->
      page.create(views.image({ imageUrl : content.url }))
      
  profile: ->
    fimo.data.load "profile", (content) ->
      page.create(views.profile({ username : content.username }))
      
  newObject: ->
    fimo.data.load "newObject", (content) ->
      page.create(views.newObject({ url: "" + @fimo.hostname + "/createObject" }))
          
  add: ->
    fimo.device.ready ->
      pictureSource = Camera.PictureSourceType['PHOTOLIBRARY']
      destinationType = Camera.DestinationType.FILE_URI
      navigator.camera.getPicture onPhotoDataSuccess, onPhotoDataFail,
        quality: 50, 
        allowEdit: true,
        destinationType: destinationType,
        sourceType: pictureSource
    
