id = 0

@fimo.events = do ->
  
  ensureMethodId = (method) ->
    if method.id == undefined
      method.id = id++

    return method
        
  triggers: {}

  on: (trigger, method) ->
    console.log("hallo")
    @triggers[trigger] ?= []
    
    ensureMethodId(method)
    
    @triggers[trigger].push
      name: trigger
      instance: method.id
      action: method
      
    console.log(@triggers)

  off: (trigger, method) ->
    if method && method.id != undefined
      @triggers = (listener for listener in @triggers[trigger] when listener.instance != method.id)

  removeTrigger: (trigger) ->
    @triggers[trigger] = null

  # return false if any of the listeners returns false, otherwise returns true
  fire: (trigger) ->
    result = true
    return result if !@triggers[trigger]
    
    params = Array.prototype.slice.call(arguments, 1)
    for listener in @triggers[trigger]
      result = false if listener.action.call(undefined, params) == false
        
    return result
