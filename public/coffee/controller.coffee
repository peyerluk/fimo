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
    # CAREFUL: this is the params object from the add controller
    jsonResponse = JSON.parse(unescape(res.response))
    page.create(views.newObject({ url: "" + hostname + "/objects/create", imageUrl: jsonResponse.imageUrl, imageId: jsonResponse.imageId, jumbleId: @jumbleId }))
    
  onPhotoDataSuccess = (imageURI) ->
    # CAREFUL: this is the params object from the add controller
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    ft = new FileTransfer
    
    ft.upload(imageURI,  "#{hostname}/upload", _.bind(onPhotoUploadSuccess, @), _.bind(onPhotoUploadFail, @), options)
    undefined
  
  # BACK
  
  back: ->
    # experimental!
    lastPage = fimo.views.moveBack()
    if lastPage && fimo.controller[lastPage]
      fimo.controller[lastPage]()
    
  # WELCOME
  
  welcome: ->
    page.create(views.welcome(), 
      navbar: false
    )
    
  # Jumbles
    
  jumbles: ->
    fimo.data.load "jumbles", (content) ->
      page.create(views.jumbles( { jumbles : content.jumbles } ),
        title: content.title
        level: 2
        scroll: true
      )
    
  wall: (params) ->
    fimo.data.load "jumbles/#{params['jumbleId']}/wall", (content) ->
      page.create(views.wall({ objects : content.objects, jumbleId: params['jumbleId'] }), 
        title: content.title
        level: 3
        scroll: true
      )
      
  object: (params) ->
    fimo.data.load "objects/#{ params['objectId'] }/show", (content) ->
      page.create(views.object({ content : content, jumbleId: params['jumbleId'], objectId: params['objectId'] }),
        level: 4
        scroll: true
      )
      
  newJumble: (args) ->
    page.create( views.newJumble(args) )
    
  jumbleObject: (args) ->
    page.create( views.jumbleObject(args) )
    
  jumblePeople: (args) ->
    page.create( views.jumblePeople(args) )
  
  # USER
  
  dashboard: ->
    page.create( views.dashboard(),
      title: "Dashboard"
      level: 1
    )
  
  profile: ->
    userId = fimo.user.getId()
    fimo.data.load "users/profile?userId=#{ userId }", (content) ->
      if content.status == 200
        page.create(views.profile({ title: content.title, user : content.user, imageUrl : content.imageUrl }))
      else
        page.create(views.message({ message: content.message }))
      
  login: ->
    page.create( views.login() )
  
  logout: ->
    fimo.user.logout()
    page.create( views.welcome() )
    
  register: ->
    page.create( views.register() )
  
        
  # IMAGE HANDLING
  
  add: (params) ->
    #console.log "params is " + params['jumbleId']
    # hack for browser views
    if fimo.device.isBrowser() # && fimo.device.getAgent() == "browser"
      page.create(views.newObject(
        url: "" + hostname + "/objects/create"
        imageUrl: "http://fimo.s3.amazonaws.com/images/501013f4ecae80d737000020_100x100.jpg"
        imageId: "501013f4ecae80d737000020",
        jumbleId: params['jumbleId']
      ))
      
    else  
      fimo.device.ready ->
        pictureSource = Camera.PictureSourceType['PHOTOLIBRARY']
        #pictureSource = Camera.PictureSourceType['CAMERA']
        destinationType = Camera.DestinationType.FILE_URI
        navigator.camera.getPicture _.bind(onPhotoDataSuccess, params), _.bind(onPhotoDataFail, params),
          quality: 50, 
          allowEdit: true,
          destinationType: destinationType,
          sourceType: pictureSource
    