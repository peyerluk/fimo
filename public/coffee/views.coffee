@fimo.views = do ->
  
  current: undefined
  
  add: (name, obj) ->
    this[name] = ->
      # set listener to page created
      obj.template.call(undefined, arguments)
  
  welcome: _.template(
    """
    <div class="heading">
      <h1>Jumbler</h1>
      <h3>more than a market</h3>
    </div>
    
    <a href="" class="btn btn-primary btn-large">Signup with Facebook</a>
    <a href="" class="btn btn-twitter btn-large">Signup with Twitter</a>
    
    <div class="separator"><span>or</span></div>
    
    <a href="register" class="btn btn-large">
      <i class="icon-user"></i>
      Create an account
    </a>
    
    <div class="footnote">
      <a href="login">Already have a Jumbler Account?</a>
    </div>
    """
  )
  
  login: _.template(
    """
    <div class="narrow">
      <div class="handwriting">
        good to have you back!
      </div>
    
      <form class="login">
        <input type="email" placeholder="email" name="email">
        <input type="password" placeholder="password" name="password">
        <br>
        <button class="btn btn-form btn-primary" type="submit">login</button>
      </form>

    </div>
    """
  )
  
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
      <form action="<%=url%>" method="POST">
        <label>Your object</label>
        <br/>
        <img src="<%=imageUrl%>" alt="preview"/>
        <br/>
        <label>Why do you want to post this?</label>
        <br/>
        <select name="verbs" multiple size="6">
        	<option selected="true">Give</option>
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
        <input type="hidden" name="imageId" value="<%=imageId%>" />
        <button type="submit" class="btn">jumble it</button>
      </form>
    """
  )