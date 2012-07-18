@fimo.controller = do ->
  data = @fimo.data
  views = @fimo.views
  page = @fimo.page
  hostname = @fimo.hostname
  
  onPhotoDataFail = ->
    alert("could not get photo data")
  
  onPhotoUploadFail = (error) ->
    alert("got error code on photo upload #{error.code}")
    
  onPhotoUploadSuccess = (res) ->
    #alert res.response
    jsonResponse = JSON.parse(unescape(res.response))
    page.create(views.newObject({ url: "" + hostname + "/objects/create", imageUrl: jsonResponse.imageUrl, imageId: jsonResponse.imageId }))
    
  onPhotoDataSuccess = (imageURI) ->
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    ft = new FileTransfer
    
    ft.upload(imageURI,  "#{hostname}/upload", onPhotoUploadSuccess, onPhotoUploadFail, options)
    undefined
  
  # WELCOME
  
  welcome: ->
    page.create(views.welcome(), 
      navbar: false
    )
    
  # Jumbles
    
  jumbles: ->
    page.create(views.jumbles(),
      title: "jumbles nearby"
    )
    
  wall: ->
    fimo.data.load "wall", (content) ->
      page.create(views.wall({ images : content.images }))
  
  image: (id) ->
    fimo.data.load "image?id=#{ id }", (content) ->
      page.create(views.image({ imageUrl : content.url }),
        slideDirection: "right"
      )
  
  # USER
  
  profile: ->
    fimo.data.load "users/profile", (content) ->
      page.create(views.profile({ username : content.username }))
      
  login: ->
    page.create(views.login(),
      scroll: false
      navbar: false
    )
    
  register: ->
    page.create(views.register(),
      scroll: false
      navbar: false
    )  
        
  # IMAGE HANDLING
  
  add: ->
    # hack for browser views
    if fimo.device.getAgent() == "browser"
      page.create(views.newObject({ url: "" + hostname + "/objects/create", imageUrl: "http://upfront.io/assets/logo/logo-1.png", imageId: "5006bc6daa33c7100800004a" }))
    else  
      fimo.device.ready ->
        pictureSource = Camera.PictureSourceType['PHOTOLIBRARY']
        destinationType = Camera.DestinationType.FILE_URI
        navigator.camera.getPicture onPhotoDataSuccess, onPhotoDataFail,
          quality: 50, 
          allowEdit: true,
          destinationType: destinationType,
          sourceType: pictureSource
    