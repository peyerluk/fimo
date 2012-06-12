
### NAMCESPACES ###
@fimo = {}
fimo = @fimo
fimo.device = {}
ready = false
phoneGapStack = []

### FIMO INITIALIZATION ###
fimo.init = ->
  controller = fimo.controller

  # navigation
  $(document).on "click", "a", (event) ->
    event.preventDefault()
    
    path = this.getAttribute("href")
    action = controller[path]
    if action
      action()
    else
      alert("#{ path } not implemented")
  
    undefined


onDeviceReady = ->
  for callback in phoneGapStack
    callback()
  ready = true  
    
fimo.device.ready = (callback) ->  
  if ready
    callback()
  else
    phoneGapStack.push(callback)
    
  
document.addEventListener("deviceready", onDeviceReady, false);  