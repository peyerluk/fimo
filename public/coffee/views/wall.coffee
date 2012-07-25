@fimo.views.add "wall", ->
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  
  template: _.template(
    """
    <ul id="wall" class="clearfix">
    <% _.each(objects, function(object) { %>
      <li><a href="object?objectId=<%=object.objectId%>&jumbleId=<%=jumbleId%>"><img src='<%= object.url %>' width="100" height="100"></a></li> 
    <% }); %>
    </ul>
    """
  )
  
  #click: (event) ->
  #  objectId = event.target.getAttribute("data-object")
  #  fimo.controller.object(objectId) if objectId
    
  loaded: ->
    false
    #fimo.events.on "click", this.click
  
  destroy: ->
    false
    #fimo.events.off "click", this.click

