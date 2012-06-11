
### NAMCESPACES ###
@fimo = {}
fimo = @fimo


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