(function() {

  this.fimo.views = (function() {
    return {
      wall: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      image: _.template("<div>\n  <nav class=\"top-nav\">\n    <a href=\"wall\" class=\"btn back\">back</a>\n  </nav>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>"),
      createObject: _.template("<form action=\"<%=url%>\" method=\"POST\">\n  <h3>Why do you want to post this?</h3>\n  <select name=\"verbs\">\n    Pass it on:\n  	<option>Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	Show it:\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <h3>What is it? (optional)</h3>\n  <div>\n    <input type=\"text\" name=\"tags\" placeholder=\"Add #tag\" />\n  </div>\n  <div><input type=\"submit\" /></div>\n</form>")
    };
  })();

}).call(this);
