@fimo.device = do ->
  _ready = false
  _phoneGapStack = []
  
  onDeviceReady = ->
    _ready = true
    for callback in _phoneGapStack
      callback()
    
  init: do ->
    document.addEventListener("deviceready", onDeviceReady, false)
    true
    
  ready: (callback) ->  
    if _ready
      callback()
    else
      _phoneGapStack.push(callback)
    
