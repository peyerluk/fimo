@fimo.views.add "wallByUsers", ->
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  
  template: _.template(
    """
    <div>
    <% _.each(itemsByUsers, function(section) { %>
    <div class="wall-user clearfix">
      <img src="<%= section.user.userImage %>" width="45" height="45">
      <div class="name">
        <%= section.user.username %> <span class="badge badge-inverse-not"><%= section.items.length %></span>
      </div>
    </div>
    <ul class="wall clearfix">
      <% _.each(section.items, function(item) { %>
      <li>
        <a href="object?objectId=<%= item.itemId %>&jumbleId=<%= jumbleId %>"><img src='<%= item.url %>' width="100" height="100"></a>
        <% if ( item.lastActivity ) { %>
          <i class="action-icon action-icon-<%= item.lastActivity %>"></i>
        <% } %>
      </li>
      <% }) %>
     </ul> 
    <% }); %>
    </div>
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

