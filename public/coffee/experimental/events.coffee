@fimo.events = do ->
  
  triggers: {}

  add:(trigger, instance, method) ->
    @triggers[trigger] ?= []
    @triggers[trigger].push
      name: trigger
      instance: instance
      action: method

  remove:(trigger, instance) ->
    @triggers = (listener for listener in @triggers[trigger] when listener.instance != instance)

  removeTrigger:(trigger) ->
    @triggers[trigger] = null

  fire:(trigger, param) ->
    return if !@triggers[trigger]

    for listener in @triggers[trigger]
      listener.instance[listener.action]( param )
