@fimo.page = do ->
  
  $page: $("#page")
  $second: $("#second-page")
  $navbar: $("#navbar")
  $title: $("#navbar-title")
  currentLevel: 2
  
  create: (content, { scroll, title, level } = {}) ->
    fimo.events.fire("newPage")
    
    slideDirection = undefined
    scroll ?= false
    @scrollable ?= undefined
    level ?= undefined
    
    if level
      if level > @currentLevel
        slideDirection = "right"
      else if level < @currentLevel
        slideDirection = "left"
        
      @currentLevel = level
    
    @$title = $("#navbar-title")
    if title 
      @$title.text(title)
    else
      @$title.html("&nbsp;")
      
    @$page.hide()    
    @$second.hide()
  
    @destroyPage()
    
    @$page.html(content)
    
    if scroll
      @scrollable = new iScroll(@$page[0], { hScrollbar: false, vScrollbar: false })
    
      # Monkey Patch I scroll for forms
      @scrollable.options.onBeforeScrollStart = (e) ->                
         target = e.target
         target = target.parentNode while target.nodeType != 1
         if target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'
             e.preventDefault()
    
    if slideDirection
      @slideIn(slideDirection)
    else
      # element = @$page[0]
      # element.style.webkitTransform = "translate3d(0px, 0, 0)"
      @$page.show()
      
      # wait for a cycle before firing "pageLoaded" to avoid artefact events
      setTimeout =>
        fimo.events.fire("pageLoaded")
        @scrollable.refresh() if @scrollable
      , 0
      
    
    
  slideIn: (slideDirection, bezier) ->
    bezier = bezier || "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)"
    
    startX = if slideDirection == "right" then 320 else -320
    element = @$page[0]
    element.style.webkitTransform = "translate3d(#{ startX }px, 0, 0)"
    
    @$page.show()
        
    element.style.webkitTransition = bezier
    element.style.webkitTransform = "translate3d(#{ 0 }px, 0, 0)"

    @swapPageContainers()
    
    setTimeout =>
      element.style.webkitTransition = "";
      element.style.webkitTransform = "";
      fimo.events.fire("pageLoaded")
      @scrollable.refresh() if @scrollable
    , 420
    
    
  update: (content) ->
    # todo:
    true
    
  destroyPage: ->
    if @scrollable
      @scrollable.destroy()
      @scrollable = undefined
      
  swapPageContainers: ->
    temp = @$page
    @$page = @$second
    @$second = temp
    @$page.html("")
      
