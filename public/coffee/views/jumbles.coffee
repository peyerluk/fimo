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
        <p>
          If you don't find a jumble that suits you, open your own
          by clicking the plus.
        </p>
      </div>
      
      <% _.each(jumbles, function(jumble) { %>
        <div class="jumble">
          <h2><%=jumble['name']%></h2>
          <div class="jumble-image">
            <a href="wall?jumbleId=<%=jumble['id']%>"><img src="<%=jumble['imageUrl']%>" width="300" height="300"></a>
            <ul class="tags">
            <% _.chain(jumble['tags']).first(3).each(function(tag) { %>
              <li><a href=""><%= tag %></a></li>
            <% }); %>
            </ul>
          </div>
          <% if (jumble.activities && jumble.activities.length) { %>
            <div class="jumble-activity">
              <% var i = 0 %>
              <% _.chain(jumble.activities).first(4).each(function(activity) { %>
              <% i += 1; %>
                <a href="object?objectId=<%= activity.itemId %>&jumbleId=<%= jumble.id %>">
                  <img src="<%= activity.itemImage %>" width="55" heigth="55">
                  <i class="action-icon action-icon-<%= activity.activity %>"></i>
                  <% activity.activity %>
                </a>
              <% }) %>
              <div class="jumble-activity-indicator"><span class="badge badge-inverse"><%= i %></span> latest activity</div>
            </div>
          <% } %>
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
    
    