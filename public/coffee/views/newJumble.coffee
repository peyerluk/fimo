@fimo.views.add "newJumble", ->
  
  template: _.template(
    """
    <form id="newJumbleForm">
      <label>Your jumble</label>
      <input type="text" name="name" placeholder="Name your jumble" id="name" />
      <legend>What's it about? (optional)</legend>
      <input type="text" name="tags" placeholder="Add #tag" id="tags" />
      <br/>
      <button type="submit" class="btn">next step</button>
    </form>
    """
  )
  
  loaded: ->    
    
    extendInstanceArguments = =>
      @instanceArguments = _.extend(@instanceArguments, { jumbleName: $('#name').val(), jumbleTags: $('#tags').val()  })
    
    if ( @instanceArguments['jumbleName'] )
      $('input#name').val(@instanceArguments['jumbleName'])
    if ( @instanceArguments['jumbleTags'] )
      $('input#tags').val(@instanceArguments['jumbleTags'])
        
    $('#newJumbleForm').submit =>
      extendInstanceArguments()
      fimo.controller['jumbleObject']( @instanceArguments )
      #fimo.page.create(fimo.views.jumbleObject( @instanceArguments ) )
      false
    
      
  destroy: ->
    console.log("destroyed jumbles#new}")