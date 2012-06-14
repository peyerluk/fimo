@fimo.page = do ->
  $page = $("#page")
  scrollable = undefined
  
  create: (content, { scroll } = {}) ->
    scroll ?= true
    @destroyPage()
    
    $page.html(content)
    scrollable = new iScroll("page", { hScrollbar: false, vScrollbar: false }) if scroll
    
  update: (content) ->
    # todo:
    true
    
  destroyPage: ->
    if scrollable
      scrollable.destroy()
      scrollable = undefined
      
