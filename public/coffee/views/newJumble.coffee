@fimo.views.add "newJumble", ->
  
  template: _.template(
    """
    <div class="page" style="min-height:0px;">
      <form id="newJumbleForm">
        <div class="separator separator-1"><em>Your Jumble</em></div>
        <input type="text" class="input-large" name="name" placeholder="Name your jumble" id="name" />
        <div class="separator separator-2"><em>What's it about?</em></div>
        <input type="text" class="input-large" name="tags" placeholder="first tag, second tag, etc." id="tags" />
        <br/>
        <button type="submit" class="btn btn-primary btn-right">next step&nbsp;»</button>
      </form>
    </div>
    """
  )
  
  loaded: ->    
    
    extendInstanceArguments = =>
      @instanceArguments = _.extend(@instanceArguments, { name: $('#name').val(), tags: $('#tags').val()  })
    
    if ( @instanceArguments['name'] )
      $('input#name').val(@instanceArguments['name'])
    if ( @instanceArguments['tags'] )
      $('input#tags').val(@instanceArguments['tags'])
        
    $('#newJumbleForm').submit =>
      extendInstanceArguments()
      fimo.controller['jumbleObject']( @instanceArguments )
      #fimo.page.create(fimo.views.jumbleObject( @instanceArguments ) )
      false
      
    $('#back').click =>
      fimo.controller['jumbles']()
      false
    
      
  destroy: ->
    console.log("destroyed jumbles#new}")