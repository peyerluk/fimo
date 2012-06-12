
### NAMCESPACES ###
@fimo = {}
fimo = @fimo

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
    
  # prevent native scrolling
  $(document.body).on('touchmove', (event) ->
    # This prevents native scrolling from happening.
    event.preventDefault()
  , false)
  
  console.log($("#page")[0])
  scrollable = new fimo.Scroller($("#page")[0])