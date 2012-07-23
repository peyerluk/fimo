
### NAMCESPACES ###
@fimo = {}
fimo = @fimo

### FIMO INITIALIZATION ###
fimo.init = ->
  controller = fimo.controller
  
  # init user
  fimo.user.init()
  
  # prevent link clicks from reloading page
  # use internal routing instead
  $(document).on "click", "a", (event) ->
    event.preventDefault()
    
    path = this.getAttribute("href")
    action = controller[path]
    if action
      action()
    else if path != "" && path != "#"
      alert("#{ path } not implemented")
  
    undefined
  
  # capture all clicks an send them to fimo.events
  $(document).on "click", (event) ->   
    fimo.events.fire("click", event)
    undefined
      
  # render the welcome page
  # controller.welcome()
  # controller.jumbles()
  
  # clean calche (easiest to do at startup, performance penalty should be negligible)
  fimo.cache.clean()
