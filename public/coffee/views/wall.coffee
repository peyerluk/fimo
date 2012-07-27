@fimo.views.add "wall", ->
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  
  template: _.template(
    """
    <ul class="wall clearfix">
    <% _.each(items, function(item) { %>
      <li>
        <a href="object?objectId=<%= item.itemId %>&jumbleId=<%= jumbleId %>"><img src='<%= item.url %>' width="100" height="100"></a>
        <% if ( item.lastActivity ) { %>
          <i class="action-icon action-icon-<%= item.lastActivity %>"></i>
        <% } %>
      </li> 
    <% }); %>
    </ul>
    """
  )
    
  loaded: ->
    false
    #fimo.events.on "click", this.click
  
  destroy: ->
    false
    #fimo.events.off "click", this.click

