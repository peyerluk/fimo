@fimo.views.add "object", ->
  
  template: _.template(
    """
    <div>
      <div class="object-user clearfix">
        <img src="<%= content.userImage %>" width="45" height="45">
        <div>
          <em class="name"><%= content.user.username %></em>
          <em class="object-jumble"><%= content.jumbleName %></em>
        </div>
      </div>
      <div class="object-image">
        <img src='<%= content.imageUrl %>' class="" width="300" height="300">
        <div class="verbs">
          <% _.each(content.verbs, function(verb) { %>
            <div class="badge badge-info"><i class="icon icon-white icon-star"></i><%= verb %></div>
          <% }); %>
        </div>
      </div>
      
      <div class="object-comments">
        <ul class="tags clearfix">
          <% _.each(content.tags, function(tag) { %>
            <li><a href=""><%= tag %></a></li>
          <% }); %>
        </ul>
        
        <div class="comment no-comments">
          <img src="img/profile-30x30.png" width="30" height="30">
          <div>
            no comments yet, dare say something?
          </div>
        </div>
        
        <form>
          <div class="btn btn-primary"><i class="icon icon-camera icon-white"></i>&nbsp;</div>
          <input type=text placeholder="comment (#tag)">
          <div class="btn btn-white"><i class="icon icon-lock"></i>&nbsp;</div>
        </form>
      </div>
      
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




