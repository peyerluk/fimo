id = 0

@fimo.events = do ->
  
  ensureMethodId = (method) ->
    if method.id == undefined
      method.id = id++

    return method
        
  triggers: {}

  on: (trigger, method) ->
    @triggers[trigger] ?= []
    
    ensureMethodId(method)
    
    @triggers[trigger].push
      name: trigger
      instance: method.id
      action: method
      

  off: (trigger, method) ->
    return if !@triggers[trigger]
    
    if method && method.id != undefined
      @triggers[trigger] = (listener for listener in @triggers[trigger] when listener.instance != method.id)
      @triggers[trigger] = undefined if @triggers[trigger].length == 0
      

  removeTrigger: (trigger) ->
    @triggers[trigger] = undefined

  # return false if any of the listeners returns false, otherwise returns true
  fire: (trigger) ->
    result = true
    return result if !@triggers[trigger]
    
    params = Array.prototype.slice.call(arguments, 1)
    for listener in @triggers[trigger]
      result = false if listener.action.apply(undefined, params) == false
        
    return result
