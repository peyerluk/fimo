@fimo.views.add "newObject", ->
  
  template: _.template(
    """
    <div class="page" style="min-height:0px;">
    <form id="newObjectForm"s>
      <div class="separator separator-1"><em>Your object</em></div>
      <img src="<%=imageUrl%>" class="preview" width="100" height="100" alt="preview">
      <br/>
      
      <div class="separator separator-4"><em>Why do you want to post this?</em></div>
        
      <div class="object-verbs clearfix" style="margin-top:15px;">
        <span>Pass it on</span>
        <a href="" class="btn"><i class="icon icon-star"></i>Give</a>
        <a href="" class="btn"><i class="icon icon-star"></i>Swap</a>
        <a href="" class="btn"><i class="icon icon-star"></i>Sell</a>
      </div>
      <div class="object-verbs clearfix">
        <span>Show it</span>
        <a href="" class="btn btn-verb-large"><i class="icon icon-star"></i>Like</a>
        <a href="" class="btn btn-verb-large"><i class="icon icon-star"></i>Want</a>
      </div>
      <br/>
      
      <div class="separator separator-2"><em>What is it? (optional)</em></div>
      <input type="text" class="input-large" name="tags" placeholder="Add #tag" id="tags" />
      <br/>
      
      <button type="submit" class="btn btn-primary btn-form-large">jumble it</button>
    </form>
    </div>
    """
  )
  
  loaded: ->
    $('#newObjectForm').submit =>
      console.log "creating object..."
      tags = $('#tags').val().split(",")
      fimo.data.post 'objects/create', { imageId: @instanceArguments['imageId'], verbs: $('#verbs').val(), tags: tags }, =>
        # TODO: route to object view
        fimo.controller.jumbles()
      , ->
        $('.alert-error').show()
        
      false
      
  destroy: ->
    console.log("destroyed objects#new}")