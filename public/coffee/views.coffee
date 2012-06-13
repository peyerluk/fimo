@fimo.views = do ->
  
  wall: _.template(
    """
    <ul id="wall" class="clearfix">
    <% _.each(images, function(image) { %>
      <li><img src='<%= image %>' width="100" height="100"></li> 
    <% }); %>
    </ul>
    """
  )
  
  image: _.template(
    """
    <a href="wall" class="back">back</a>
    <img src='<%= imageUrl %>' class="portrait" width="300">
    """
  )
  
  profile: _.template(
    """
    <div>
      <h1><%= username %></h1>
    </div>
    """
  )