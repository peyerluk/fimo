@fimo.views.add "jumbles", ->
  
  # todo: need to figure out how to nest templates, before we can use this
  jumble = _.template(
    """
    <div class="jumble">
      <h2><%= title %></h2>
      <div class="jumble-image">
        <img src="<%= imageSrc %>" width="300">
      </div>
      <div class="description">Zürich</div>
    </div>
    """
  )
  
  template: _.template(
    """
    <div class="jumble-wall">
      <div class="handwriting handwriting-jumbles">
        <h3>welcome to jumbler!</h3>
        If you don't find a jumble that suits you, open your own
        by clicking the plus.
      </div>
      
      <% _.each(jumbles, function(jumble) { %>
        <div class="jumble">
          <h2><%=jumble['name']%></h2>
          <div class="jumble-image">
            <a href="wall?jumbleId=<%=jumble['id']%>"><img src="<%=jumble['imageUrl']%>" width="300"></a>
            <ul class="tags">
            <% 
              var i = 0;
              _.each(jumble['tags'], function(tag) { 
              i += 1;
              if (i < 4) { 
            %>
              <li><a href=""><%= tag %></a></li>
            <% }}); %>
            </ul>
          </div>
        </div>
      <% }); %>
      
    </div>
    """
  )
  
  # click: (event) ->
  #     jumble = $(event.target).parents(".jumble")
  #     if jumble.length
  #       fimo.controller.wall( "500d748aa52aa5516c000004" )
  #     
  loaded: ->
    false
    #fimo.events.on "click", this.click
  
  destroy: ->
    false
    #fimo.events.off "click", this.click
    
    