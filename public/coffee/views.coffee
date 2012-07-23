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
    fimo.events.fire("afterPageLoaded", current?.name)
    current.loaded() if current
    
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
      
  
  message: _.template(
    """
    <div class="page">
      <%= message %>
    </div>
    """
  )
