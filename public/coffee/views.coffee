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
  
  createObject: _.template(
    """
      <form action="<%=url%>" method="POST">
        <h3>Why do you want to post this?</h3>
        <select name="verbs">
          Pass it on:
        	<option>Give</option>
        	<option>Swap</option>
        	<option>Sell</option>
        	Show it:
        	<option>Like</option>
        	<option>Want</option>
        </select>
        <h3>What is it? (optional)</h3>
        <div>
          <input type="text" name="tags" placeholder="Add #tag" />
        </div>
        <div><input type="submit" /></div>
      </form>
    """
  )