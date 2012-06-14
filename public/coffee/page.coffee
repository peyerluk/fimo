@fimo.page = do ->
  scrollable = undefined
  
  $page: $("#page")
  $second: $("#second-page")
  
  create: (content, { scroll } = {}) ->
    scroll ?= true
    @destroyPage()

    @$page.hide()    
    @$second.hide()
    
    @$page.html(content)

    element = @$page[0]
    element.style.webkitTransform = "translate3d(#{ 320 }px, 0, 0)"
    
    @$page.show()
        
    element.style.webkitTransition = "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)"
    element.style.webkitTransform = "translate3d(#{ 0 }px, 0, 0)"
    
    scrollable = new iScroll(@$page[0], { hScrollbar: false, vScrollbar: false }) if scroll

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
      
