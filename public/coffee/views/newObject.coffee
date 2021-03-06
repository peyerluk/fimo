@fimo.views.add "newObject", ->
  
  template: _.template(
    """
    <div class="page" style="min-height:0px;">
    <form id="newObjectForm">
      <div class="separator separator-1"><em>Your object</em></div>
      <img src="<%= imageUrl %>" class="preview" width="100" height="100" alt="preview">
      <br/>
      
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
      <br/>
      
      <div class="separator separator-2"><em>What is it? (optional)</em></div>
      <input type="text" class="input-large" name="tags" placeholder="tag, second tag, another tag" id="tags" />
      <br/>
      
      <button type="submit" class="btn btn-primary btn-form-large">jumble it</button>
    </form>
    </div>
    """
  )
  
  loaded: ->
    verbs = {}
    $(".newObject-verbs").on "click", "a", (event) ->
      $this = $(this)
      $this.toggleClass("btn-info")
      $this.find("i").toggleClass("icon-white")
      verbs[$this.data("verb")] = !verbs[$this.data("verb")]
      
      
    $('#newObjectForm').submit =>
      console.log "creating object..."
      
      verbs = for key, value of verbs when value == true
        key
        
      tags = _.map $('#tags').val().split(","), (tag) ->
        $.trim(tag).toLowerCase()
        
      fimo.data.post 'objects/create', { imageId: @instanceArguments['imageId'], jumble: @instanceArguments['jumbleId'], verbs: verbs, tags: tags }, (data) =>
        fimo.cache.remove("jumbles/#{ data.jumbleId }/wall-by-users")
        fimo.controller.object({ objectId: data.objectId, jumbleId: data.jumbleId })
      , ->
        false
        
      false
      
  destroy: ->
    console.log("destroyed objects#new}")