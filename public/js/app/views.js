(function() {

  this.fimo.views = (function() {
    return {
      current: void 0,
      add: function(name, obj) {
        return this[name] = function() {
          return obj.template.call(void 0, arguments);
        };
      },
      welcome: _.template("<div class=\"heading\">\n  <h1>Jumbler</h1>\n  <h3>more than a market</h3>\n</div>\n\n<a href=\"\" class=\"btn btn-primary btn-large\">Signup with Facebook</a>\n<a href=\"\" class=\"btn btn-twitter btn-large\">Signup with Twitter</a>\n\n<div class=\"separator\"><span>or</span></div>\n\n<a href=\"register\" class=\"btn btn-large\">\n  <i class=\"icon-user\"></i>\n  Create an account\n</a>\n\n<div class=\"footnote\">\n  <a href=\"login\">Already have a Jumbler Account?</a>\n</div>"),
      login: _.template("<div class=\"narrow\">\n  <div class=\"handwriting\">\n    good to have you back!\n  </div>\n\n  <form class=\"login\">\n    <input type=\"email\" placeholder=\"email\" name=\"email\">\n    <input type=\"password\" placeholder=\"password\" name=\"password\">\n    <br>\n    <button class=\"btn btn-form btn-primary\" type=\"submit\">login</button>\n  </form>\n\n</div>"),
      wall: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      image: _.template("<div>\n  <nav class=\"top-nav\">\n    <a href=\"wall\" class=\"btn back\">back</a>\n  </nav>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>"),
      newObject: _.template("<form action=\"<%=url%>\" method=\"POST\">\n  <label>Your object</label>\n  <br/>\n  <img src=\"<%=imageUrl%>\" alt=\"preview\"/>\n  <br/>\n  <label>Why do you want to post this?</label>\n  <br/>\n  <select name=\"verbs\" multiple size=\"6\">\n  	<option selected=\"true\">Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <br/>\n  <label>What is it? (optional)</label>\n  <br/>\n  <input type=\"text\" class=\"span3\" name=\"tags\" placeholder=\"Add #tag\" />\n  <br/>\n  <input type=\"hidden\" name=\"imageId\" value=\"<%=imageId%>\" />\n  <button type=\"submit\" class=\"btn\">jumble it</button>\n</form>")
    };
  })();

}).call(this);
