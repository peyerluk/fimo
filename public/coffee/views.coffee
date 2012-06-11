@fimo.views = do ->
  
  wall: _.template(
    """
    <ul>
    <% _.each(images, function(image) { %>
      <li><img src='<%= image %>'></li> 
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