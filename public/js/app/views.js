(function() {

  this.fimo.views = (function() {
    return {
      wall: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      image: _.template("<div>\n  <nav class=\"top-nav\">\n    <a href=\"wall\" class=\"btn back\">back</a>\n  </nav>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>"),
      newObject: _.template("<form class=\"well\" action=\"<%=url%>\" method=\"POST\">\n  <label>Why do you want to post this?</label>\n  <br/>\n  <select name=\"verbs\" multiple size=\"6\">\n  	<option>Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <br/>\n  <label>What is it? (optional)</label>\n  <br/>\n  <input type=\"text\" class=\"span3\" name=\"tags\" placeholder=\"Add #tag\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">jumble it</button>\n</form>")
    };
  })();

}).call(this);
