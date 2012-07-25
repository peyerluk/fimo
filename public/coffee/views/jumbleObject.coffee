@fimo.views.add "jumbleObject", ->
  
  template: _.template(
    """
    <div class="page" style="min-height:0px;">
    <form id="jumbleObjectForm">
      <div class="handwriting">
        What's the first thing you want to post in your jumble?
      </div>
      <br/>
      <a href="" id="imageLink"><img src="img/camera-plus.png" alt="take image" style="margin-left:80px" id="previewImage" /></a><br/>
      
      <div class="separator separator-4"><em>Why do you want to post this?</em></div>
        
      <div class="newObject-verbs clearfix" style="margin-top:15px;">
        <span>Pass it on</span>
        <a href="" class="btn" data-verb="give"><i class="icon icon-star"></i>Give</a>
        <a href="" class="btn" data-verb="swap"><i class="icon icon-star"></i>Swap</a>
        <a href="" class="btn" data-verb="sell"><i class="icon icon-star"></i>Sell</a>
      </div>
      <div class="newObject-verbs clearfix">
        <span>Show it</span>
        <a href="" class="btn btn-verb-large" data-verb="like"><i class="icon icon-star"></i>Like</a>
        <a href="" class="btn btn-verb-large" data-verb="want"><i class="icon icon-star"></i>Want</a>
      </div>
      <div class="separator separator-2"><em>What is it?</em></div>
      <input type="text" class="input-large" name="tags" placeholder="first tag, second tag, etc." id="tags" />
      <button type="submit" class="btn btn-primary btn-right">next step&nbsp;»</button>
    </form>
    </div>
    """
  )
  
  
  onPhotoUploadFail: (error) ->
    alert("got an upload error: #{error.code}")
    
  onPhotoUploadSuccess: (res) ->
    jsonResponse = JSON.parse(unescape(res.response))
    #alert _.keys(jsonResponse)
    $('#previewImage').attr "src", ->
      return jsonResponse.imageUrl
    $('#previewImage').show()
    # set the vars in the views attributes
    @instanceArguments['primaryObject']['imageUrl'] = jsonResponse.imageUrl
    @instanceArguments['primaryObject']['imageId'] = jsonResponse.imageId
    
  onPhotoDataSuccess: (imageURI) ->
    options = new FileUploadOptions()
    options.fileKey = "displayImage"
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)
    options.mimeType = "image/jpeg"
    ft = new FileTransfer()
    ft.upload(imageURI,  "#{fimo.hostname}/upload", _.bind(@onPhotoUploadSuccess, @), _.bind(@onPhotoUploadFail, @), options)
    undefined
    
  onPhotoDataFail: ->
    alert("failed")
    false  
  
  loaded: ->
  
    # init empty
    
    if !@instanceArguments['primaryObject']
      @instanceArguments['primaryObject'] = {}
    if !@instanceArguments['primaryObject']['verbs']
      @instanceArguments['primaryObject']['verbs'] = []
    
    console.log @instanceArguments['primaryObject']['verbs']
    
    # Helper functions
    
    readVerbs = ($elem) =>
      $elem.toggleClass("btn-info")
      $elem.find("i").toggleClass("icon-white")
      if _.find( @instanceArguments['primaryObject']['verbs'], (verb) ->
        $elem.data("verb") == verb )
        #console.log "remove " + $elem.data("verb")
        @instanceArguments['primaryObject']['verbs'] = _.without( @instanceArguments['primaryObject']['verbs'], $elem.data("verb") )
      else
        # add
        @instanceArguments['primaryObject']['verbs'].push($elem.data("verb")) 
      false
        
    extendInstanceArguments = =>
      #primaryObject = _.extend(@instanceArguments['primaryObject'], { verbs: $('#verbs').val(), tags: $('#tags').val() } )
      #@instanceArguments = _.extend(@instanceArguments, { primaryObject: primaryObject })
      @instanceArguments['primaryObject']['tags'] = $("#tags").val()
      false
    
    if @instanceArguments['primaryObject']['tags']
      $('#tags').val(@instanceArguments['primaryObject']['tags'])
    _.each( @instanceArguments['primaryObject']['verbs'], (verb) ->
      #console.log "init verb " + verb
      $elem = $("[data-verb=#{verb}]")
      $elem.toggleClass("btn-info")
      $elem.find("i").toggleClass("icon-white") )
    if @instanceArguments['primaryObject']['imageUrl']
      $('#previewImage').attr 'src', => 
        @instanceArguments['primaryObject']['imageUrl']
      $('#previewImage').show()
      
    # Events
      
    $(".newObject-verbs").on "click", "a", (event) ->
      readVerbs( $(this) )
      
    $('#imageLink').click =>
      if fimo.device.getAgent() == "browser"
        @onPhotoUploadSuccess( { "response": JSON.stringify({ "imageUrl": "http://fimo.s3.amazonaws.com/images/501013f4ecae80d737000020_100x100.jpg", imageId: "501013f4ecae80d737000020" }) } )
      else
        fimo.device.ready =>    
          navigator.camera.getPicture _.bind(@onPhotoDataSuccess, @), _.bind(@onPhotoDataFail, @),
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            quality: 50
          false
        false        
    
    $('#jumbleObjectForm').submit =>
      extendInstanceArguments()
      fimo.controller['jumblePeople']( @instanceArguments )
      false
      
    $('#back').click =>
      extendInstanceArguments()
      fimo.controller['newJumble']( @instanceArguments )
      false
      
  destroy: ->
    console.log("destroyed jumbles#object}")