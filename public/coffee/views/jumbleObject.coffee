@fimo.views.add "jumbleObject", ->
  
  template: _.template(
    """
    <p>What's the first thing you want to post in your jumble?</p>
    <form id="jumbleObjectForm">
      <label>Take a picture</label>
      <img src="" id="previewImage" style="display:none;"/><br/>
      <a href="" id="imageLink">Take an image</a><br/>
      <label>Why do you want to post this?</label>
      <br/>
      <select name="verbs" multiple size="6" id="verbs">
      	<option selected="true">Give</option>
      	<option>Swap</option>
      	<option>Sell</option>
      	<option>Like</option>
      	<option>Want</option>
      </select>
      <br/>
      <label>What is it? (optional)</label>
      <br/>
      <input type="text" class="span3" name="tags" placeholder="Add #tag" id="tags" />
      <br/>
      <button type="submit" class="btn">next step</button>
    </form>
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
    
    extendInstanceArguments = =>
      @instanceArguments = _.extend(@instanceArguments, { primaryObject: { verbs: $('#verbs').val(), tags: $('#tags').val() } })
    
    if @instanceArguments['primaryObject']['verbs']
      $('#verbs').val(@instanceArguments['primaryObject']['verbs'])
    if @instanceArguments['primaryObject']['tags']
      $('#tags').val(@instanceArguments['primaryObject']['tags']) 
    if @instanceArguments['primaryObject']['imageUrl']
      $('#previewImage').attr 'src', => 
        @instanceArguments['primaryObject']['imageUrl']
      $('#previewImage').show()
      
    $('#imageLink').click =>
      if fimo.device.getAgent() == "browser"
        @onPhotoUploadSuccess( { "response": JSON.stringify({ "imageUrl": "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg", imageId: "4fff0a2e0df2a02233000007" }) } )
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