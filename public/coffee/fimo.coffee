
### NAMCESPACES ###
@fimo = {}
fimo = @fimo

### FIMO INITIALIZATION ###
fimo.init = ->
  controller = fimo.controller
  
  # init user
  fimo.user.init()

  # navigation events
  $(document).on "click", "a", (event) ->
    event.preventDefault()
    
    path = this.getAttribute("href")
    action = controller[path]
    if action
      action()
    else
      alert("#{ path } not implemented")
  
    undefined
  
  # clicks on object images
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  $(document).on "click", (event) ->
    imageSrc = event.target.getAttribute("src")
    if imageSrc
      result = imageIdRegex.exec(imageSrc)
      if result
        controller.image(result[0])
      
    
  # $(document).ready ->
  #   scrollable = new iScroll("page")
  
  # test experimental/google_scroll
  # # prevent native scrolling
  # $(document.body).on('touchmove', (event) ->
  #   # This prevents native scrolling from happening.
  #   event.preventDefault()
  # , false)
  # 
  # scrollable = new fimo.Scroller($("#page")[0])
