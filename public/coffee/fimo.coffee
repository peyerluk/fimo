
### NAMCESPACES ###
@fimo = {}
fimo = @fimo
fimo.device = {}
ready = false
phoneGapStack = []

### FIMO INITIALIZATION ###
fimo.init = ->
  controller = fimo.controller
  # authentication
  if store.get('user')
    # TODO: login user
  else
    # TODO: call create user function on server
    # TODO: add in coordinates
    #fimo.data.post 'register', {'email':'test@fimo.com', 'username':'test', 'password':'notsosecure'} ->
      # TODO: login user
      #alert("logging in...")
      # TODO: store user to local store
  
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