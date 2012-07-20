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
  
  # BACK
  
  back: ->
    # experimental!
    lastPage = fimo.views.moveBack()
    if lastPage
      fimo.controller[lastPage]()
    
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
      page.create(views.wall({ images : content.images }), 
        title: content.title
      )
  
  image: (id) ->
    fimo.data.load "image?id=#{ id }", (content) ->
      page.create(views.image({ imageUrl : content.url }),
        slideDirection: "right"
      )
      
  addJumble: ->
    page.create( views.newJumble(),
      scroll: false
    )
  
  # USER
  
  profile: ->
    fimo.data.load "users/profile", (content) ->
      page.create(views.profile({ username : content.username }))
      
  login: ->
    page.create(views.login(),
      scroll: false
    )
    
  register: ->
    page.create(views.register(),
      scroll: false
    )  
  
        
  # IMAGE HANDLING
  
  add: ->
    # hack for browser views
    if fimo.device.isRunning() # && fimo.device.getAgent() == "browser"
      page.create(views.newObject(
        url: "" + hostname + "/objects/create"
        imageUrl: "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg"
        imageId: "4fff0a2e0df2a02233000007"
      ))
      
    else  
      fimo.device.ready ->
        pictureSource = Camera.PictureSourceType['PHOTOLIBRARY']
        #pictureSource = Camera.PictureSourceType['CAMERA']
        destinationType = Camera.DestinationType.FILE_URI
        navigator.camera.getPicture onPhotoDataSuccess, onPhotoDataFail,
          quality: 50, 
          allowEdit: true,
          destinationType: destinationType,
          sourceType: pictureSource
    