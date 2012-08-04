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
        
        <div id="comments" class="comments-container">
        <% if ( content.comments && content.comments.length > 0 ) { %>
          <% _.each( content.comments, function(comment) { %>
            <% if ( comment.userId == content.user._id ) { %>
            <div class="well author-comment">
            <% } else { %>
            <div class="well conversation-comment">
            <% } %>  
              <img src="<%= comment.userImageUrl %>" class="comment-user-image" width="45" height="45">
              <div>
                <strong><%= comment.username %></strong>:&nbsp;<%= fimo.formatTagStrings(comment.text) %>
              </div>
            </div>
            <div class="clearfix"></div>
          <% }); %>
        <% } else { %>
          <div class="no-comments">
            <img src="img/profile-45x45.png" width="45" height="45">
            <div>
              no comments yet, dare say something?
            </div>
          </div>
        <% } %>
        </div>

        <form id="commentForm">
          <div class="btn btn-primary"><i class="icon icon-camera icon-white"></i>&nbsp;</div>
          <input type=text placeholder="comment (#tag)" id="commentText">
          <div class="btn btn-white"><i class="icon icon-lock"></i>&nbsp;</div>
        </form>
      </div>      
    </div>
    """
  )
  
  loaded: ->
    $("#commentForm").submit (e) =>
      #alert(@instanceArguments['objectId'])
      fimo.data.post "objects/#{@instanceArguments['objectId']}/comment", { text : $("#commentText").val(), jumbleId : @instanceArguments['jumbleId'] } , (data) =>
        commentsHtml = ""
        _.each( data.comments, (comment) =>
          if comment.userId == @instanceArguments['content'].user._id
            commentsHtml = "#{commentsHtml}<div class='well author-comment'><img src='#{comment.userImageUrl}' width='45' height='45'><strong>#{comment.username}</strong>:&nbsp;#{fimo.formatTagStrings(comment.text)}</div><div class='clearfix'></div>"
          else
            commentsHtml = "#{commentsHtml}<div class='well conversation-comment'><img src='#{comment.userImageUrl}' width='45' height='45'><strong>#{comment.username}</strong>:&nbsp;#{fimo.formatTagStrings(comment.text)}</div><div class='clearfix'></div>" 
          commentsHtml )
          
        $("#comments").html(commentsHtml)
        $("#commentText}").val("")
        fimo.page.scrollable.refresh()
        fimo.cache.remove("objects/#{@instanceArguments['objectId']}/show")
        fimo.cache.remove("jumbles/#{@instanceArguments['jumbleId']}/wall-by-users")
        fimo.cache.remove("jumbles")
      , (data, error, exception) =>
        alert(error)
      false
    
  
  destroy: ->
    false
    #fimo.events.off "click", this.click




