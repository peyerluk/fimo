@fimo.page = do ->
  scrollable = undefined
  
  $page: $("#page")
  $second: $("#second-page")
  
  create: (content, { scroll, slideDirection } = {}) ->
    scroll ?= true
    slideDirection ?= undefined
    
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
    
    
  slideIn: (slideDirection) ->
    startX = if slideDirection == "right" then 320 else -320
    element = @$page[0]
    element.style.webkitTransform = "translate3d(#{ startX }px, 0, 0)"
    
    @$page.show()
        
    element.style.webkitTransition = "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)"
    element.style.webkitTransform = "translate3d(#{ 0 }px, 0, 0)"

    @swapPageContainers()
    
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
      
