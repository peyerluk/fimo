@fimo.views.add "newObject", ->
  
  template: _.template(
    """
    <form id="newObjectForm">
      <label>Your object</label>
      <br/>
      <img src="<%=imageUrl%>" alt="preview"/>
      <br/>
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
      <button type="submit" class="btn">jumble it</button>
    </form>
    """
  )
  
  loaded: ->
    $('#newObjectForm').submit =>
      console.log "creating object..."
      fimo.data.post 'objects/create', { imageId: @instanceArguments['imageId'], verbs: $('#verbs').val(), tags: $('#tags').val() }, =>
        # TODO: route to object view
        fimo.controller.jumbles()
      , ->
        $('.alert-error').show()
        
      false
      
  destroy: ->
    console.log("destroyed objects#new}")