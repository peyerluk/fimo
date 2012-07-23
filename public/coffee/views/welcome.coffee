@fimo.views.add "welcome", ->
  
  template: _.template(
    """
    <div class="welcome">
      <h1>Jumbler</h1>
      <h3>more than a market</h3>
    </div>
    
    <a href="" class="btn btn-primary btn-large">Signup with Facebook</a>
    <a href="" class="btn btn-twitter btn-large">Signup with Twitter</a>
    
    <div class="separator"><span>or</span></div>
    
    <a href="register" class="btn btn-large">
      <i class="icon-user"></i>
      Signup with email
    </a>
    
    <div class="footnote">
      <a href="login">Already have a Jumbler Account?</a>
    </div>
    """
  )
  
  click: (event) ->
    # todo
    true
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click