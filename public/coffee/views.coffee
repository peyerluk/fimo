@fimo.views = do ->
  
  history = []
  current = undefined
  next = undefined
  nextViewArguments = undefined
  currentViewArguments = undefined
    
  fimo.events.on "newPage", ->
    if current
      current.destroy()
      history.push(current.name)
      
    current = undefined
    
  fimo.events.on "pageLoaded", ->
    current = next
    currentViewArguments = nextViewArguments
    nextViewArguments = undefined # NOTE: this step is not necessary, but should clarify the code
    next = undefined
    fimo.events.fire("afterPageLoaded", current?.name, currentViewArguments)
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
      view['instanceArguments'] = arguments[0] || {}
      #console.log "got instance arguments " + _.keys(view['instanceArguments'])
      nextViewArguments = view['instanceArguments']
      view.template.apply(undefined, arguments)
      
  
  message: _.template(
    """
    <div class="page">
      <%= message %>
    </div>
    """
  )
