@fimo.views = do ->
  
  wall: _.template(
    """
    <ul id="wall">
    <% _.each(images, function(image) { %>
      <li><img src='<%= image %>' width="100" height="100"></li> 
    <% }); %>
    </ul>
    """
  )
  
  profile: _.template(
    """
    <div>
      <h1><%= username %></h1>
    </div>
    """
  )