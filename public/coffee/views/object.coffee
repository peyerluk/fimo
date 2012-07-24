@fimo.views.add "object", ->
  
  template: _.template(
    """
    <div>
      <div class="object-user">
        <img src="img/profile-small.png">
        <span><%= content.user.email %></span>
      </div>
      <div class="object-image">
        <img src='<%= content.imageUrl %>' class="portrait" width="300">
        <ul class="tags">
          <% _.each(content.tags, function(tag) { %>
            <li><a href=""><%= tag %></a></li>
          <% }); %>
        </ul>
      </div>
      <div><%= content.verbs %></div>
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




