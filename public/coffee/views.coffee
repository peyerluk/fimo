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
    <div>
      <nav class="top-nav">
        <a href="wall" class="btn back">back</a>
      </nav>
      <img src='<%= imageUrl %>' class="portrait" width="300">
    </div>
    """
  )
  
  profile: _.template(
    """
    <div>
      <h1><%= username %></h1>
    </div>
    """
  )
  
  newObject: _.template(
    """
      <form class="well" action="<%=url%>" method="POST">
        <label>Why do you want to post this?</label>
        <br/>
        <select name="verbs" multiple size="6">
        	<option>Give</option>
        	<option>Swap</option>
        	<option>Sell</option>
        	<option>Like</option>
        	<option>Want</option>
        </select>
        <br/>
        <label>What is it? (optional)</label>
        <br/>
        <input type="text" class="span3" name="tags" placeholder="Add #tag" />
        <br/>
        <button type="submit" class="btn">jumble it</button>
      </form>
    """
  )