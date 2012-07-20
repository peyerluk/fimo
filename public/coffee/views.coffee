@fimo.views = do ->
  
  history = []
  current = undefined
  next = undefined
    
  fimo.events.on "newPage", ->
    if current
      current.destroy()
      history.push(current.name)
      
    current = undefined
    
  fimo.events.on "pageLoaded", ->
    current = next
    next = undefined
    current.loaded() if current
    fimo.events.fire("afterPageLoaded", current?.name)
  
  # add a view programmatically
  moveBack: () ->
    if history.length
      history.pop()
    else
      undefined
    
  add: (name, module) ->
    view = module()
    view.name = name
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
  
  profile: _.template(
    """
    <div>
      <h1><%= username %></h1>
    </div>
    """
  )