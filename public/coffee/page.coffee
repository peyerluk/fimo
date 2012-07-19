@fimo.page = do ->
  scrollable = undefined
  
  $page: $("#page")
  $second: $("#second-page")
  $navbar: $("#navbar")
  $title: $("#navbar-title")
  
  create: (content, { scroll, slideDirection, navbar, title } = {}) ->
    fimo.events.fire("newPage")
    
    scroll ?= true
    slideDirection ?= undefined
    navbar ?= true
    
    if navbar
      @$navbar.show()
    else
      @$navbar.hide()
      
    if title 
      @$title.text(title)
    else
      @$title.html("&nbsp;")
      
    @$page.hide()    
    @$second.hide()
  
    @destroyPage()
    
    @$page.html(content)
    scrollable = new iScroll(@$page[0], { hScrollbar: false, vScrollbar: false }) if scroll
    
    if slideDirection
      @slideIn(slideDirection)
    else
      # element = @$page[0]
      # element.style.webkitTransform = "translate3d(0px, 0, 0)"
      @$page.show()
      
      # wait for a cycle before firing "pageLoaded" to avoid artefact events
      setTimeout ->
        fimo.events.fire("pageLoaded")
        scrollable.refresh() if scrollable
      , 0
      
    
    
  slideIn: (slideDirection) ->
    startX = if slideDirection == "right" then 320 else -320
    element = @$page[0]
    element.style.webkitTransform = "translate3d(#{ startX }px, 0, 0)"
    
    @$page.show()
        
    element.style.webkitTransition = "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)"
    element.style.webkitTransform = "translate3d(#{ 0 }px, 0, 0)"

    @swapPageContainers()
    
    setTimeout ->
      fimo.events.fire("pageLoaded")
    , 400
    
    
  update: (content) ->
    # todo:
    true
    
  destroyPage: ->
    if scrollable
      scrollable.destroy()
      scrollable = undefined
      
  swapPageContainers: ->
    temp = @$page
    @$page = @$second
    @$second = temp
    @$page.html("")
      
