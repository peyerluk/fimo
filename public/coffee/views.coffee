@fimo.views = do ->
  
  current = undefined
  next = undefined
    
  fimo.events.on "newPage", ->
    if current
      current.destroy()
      
    current = undefined
    
  fimo.events.on "pageLoaded", ->
    current = next
    next = undefined
    current.loaded() if current
  
  # add a view programmatically
  add: (name, module) ->
    view = module()
    this[name] = ->
      next = view
      #console.log("setting instanceArguments to: " + arguments[0]);
      #console.log(arguments[0])
      view['instanceArguments'] = arguments[0] || {}
      view.template.apply(undefined, arguments)
      
  
  welcome: _.template(
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
  
  image: _.template(
    """
    <div>
      <nav class="top-nav">
        <a href="wall" class="btn back">back</a>
      </nav>
      <img src='<%= imageUrl %>' class="portrait" width="300">
    </div>
    """
  )
  
  profile: _.template(
    """
    <div>
      <h1><%= username %></h1>
    </div>
    """
  )