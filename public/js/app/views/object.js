(function() {

  this.fimo.views.add("object", function() {
    return {
      template: _.template("<div>\n  <div class=\"object-user clearfix\">\n    <img src=\"<%= content.userImage %>\" width=\"45\" height=\"45\">\n    <div>\n      <em class=\"name\"><%= content.user.username %></em>\n      <em class=\"object-jumble\"><%= content.jumbleName %></em>\n    </div>\n  </div>\n  <div class=\"object-image\">\n    <img src='<%= content.imageUrl %>' class=\"\" width=\"300\" height=\"300\">\n    <div class=\"verbs\">\n      <% _.each(content.verbs, function(verb) { %>\n        <div class=\"badge badge-info\"><i class=\"icon icon-white icon-star\"></i><%= verb %></div>\n      <% }); %>\n    </div>\n  </div>\n  \n  <div class=\"object-comments\">\n    <ul class=\"tags clearfix\">\n      <% _.each(content.tags, function(tag) { %>\n        <li><a href=\"\"><%= tag %></a></li>\n      <% }); %>\n    </ul>\n    \n    <div id=\"comments\">\n    <% if ( content.comments && content.comments.length > 0 ) { %>\n      <% _.each( content.comments, function(comment) { %>\n        <% if ( comment.userId == content.user._id ) { %>\n        <div class=\"well author-comment\">\n        <% } else { %>\n        <div class=\"well conversation-comment\">\n        <% } %>  \n          <img src=\"<%= comment.userImageUrl %>\" class=\"comment-user-image\" width=\"45\" height=\"45\">\n          <div>\n            <strong><%= comment.username %></strong>:&nbsp;<%= fimo.formatTagStrings(comment.text) %>\n          </div>\n        </div>\n        <div class=\"clearfix\"></div>\n      <% }); %>\n    <% } else { %>\n      <div class=\"comment no-comments\">\n        <img src=\"img/profile-30x30.png\" width=\"30\" height=\"30\">\n        <div>\n          no comments yet, dare say something?\n        </div>\n      </div>\n    <% } %>\n    </div>\n\n    <form id=\"commentForm\">\n      <div class=\"btn btn-primary\"><i class=\"icon icon-camera icon-white\"></i>&nbsp;</div>\n      <input type=text placeholder=\"comment (#tag)\" id=\"commentText\">\n      <div class=\"btn btn-white\"><i class=\"icon icon-lock\"></i>&nbsp;</div>\n    </form>\n  </div>      \n</div>"),
      loaded: function() {
        var _this = this;
        return $("#commentForm").submit(function(e) {
          fimo.data.post("objects/" + _this.instanceArguments['objectId'] + "/comment", {
            text: $("#commentText").val(),
            jumbleId: _this.instanceArguments['jumbleId']
          }, function(data) {
            var commentsHtml;
            commentsHtml = "";
            _.each(data.comments, function(comment) {
              if (comment.userId === _this.instanceArguments['content'].user._id) {
                commentsHtml = "" + commentsHtml + "<div class='well author-comment'><img src='" + comment.userImageUrl + "' width='45' height='45'><strong>" + comment.username + "</strong>:&nbsp;" + (fimo.formatTagStrings(comment.text)) + "</div><div class='clearfix'></div>";
              } else {
                commentsHtml = "" + commentsHtml + "<div class='well conversation-comment'><img src='" + comment.userImageUrl + "' width='45' height='45'><strong>" + comment.username + "</strong>:&nbsp;" + (fimo.formatTagStrings(comment.text)) + "</div><div class='clearfix'></div>";
              }
              return commentsHtml;
            });
            $("#comments").html(commentsHtml);
            $("#commentText}").val("");
            fimo.page.scrollable.refresh();
            return fimo.cache.remove("objects/" + _this.instanceArguments['objectId'] + "/show");
          }, function(data, error, exception) {
            return alert(error);
          });
          return false;
        });
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
