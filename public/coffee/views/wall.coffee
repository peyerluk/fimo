@fimo.views.add "wall", ->
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  
  template: _.template(
    """
    <ul id="wall" class="clearfix">
    <% _.each(objects, function(object) { %>
      <li><img src='<%= object.url %>' data-object="<%= object.objectId %>" width="100" height="100"></li> 
    <% }); %>
    </ul>
    """
  )
  
  click: (event) ->
    objectId = event.target.getAttribute("data-object")
    fimo.controller.object(objectId) if objectId
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click

