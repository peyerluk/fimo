@fimo.views.add "profile", ->
  
  template: _.template(
    """
    <div class="page">
      <h1><%= user.username ? user.username : 'No username given' %></h1>
      <h3>Email: <%= user.email %></h3>
      <br/>
      <h2>Your profile picture</h2>
      <% if ( user.picture ) { %>
        <img src="<%= imageUrl %>" />
      <% } else { %>
        no profile picture
      <% } %>
      <form action="<%=fimo.hostname%>/users/profilePicture" method="POST" enctype="multipart/form-data">
        <input type="file" name="displayImage">
        <br/>
        <input type="submit">
      </form>
    </div>
    
    """
  )
  
  click: (event) ->
    # todo
    true
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click