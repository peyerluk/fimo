(function() {

  this.fimo.views = (function() {
    var current, next;
    current = void 0;
    next = void 0;
    fimo.events.on("newPage", function() {
      if (current) {
        current.destroy();
      }
      return current = void 0;
    });
    fimo.events.on("pageLoaded", function() {
      current = next;
      next = void 0;
      if (current) {
        return current.loaded();
      }
    });
    return {
      add: function(name, module) {
        var view;
        view = module();
        return this[name] = function() {
          next = view;
          return view.template.apply(void 0, arguments);
        };
      },
      welcome: _.template("<div class=\"welcome\">\n  <h1>Jumbler</h1>\n  <h3>more than a market</h3>\n</div>\n\n<a href=\"\" class=\"btn btn-primary btn-large\">Signup with Facebook</a>\n<a href=\"\" class=\"btn btn-twitter btn-large\">Signup with Twitter</a>\n\n<div class=\"separator\"><span>or</span></div>\n\n<a href=\"register\" class=\"btn btn-large\">\n  <i class=\"icon-user\"></i>\n  Signup with email\n</a>\n\n<div class=\"footnote\">\n  <a href=\"login\">Already have a Jumbler Account?</a>\n</div>"),
      image: _.template("<div>\n  <nav class=\"top-nav\">\n    <a href=\"wall\" class=\"btn back\">back</a>\n  </nav>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>"),
      newObject: _.template("<form action=\"<%=url%>\" method=\"POST\">\n  <label>Your object</label>\n  <br/>\n  <img src=\"<%=imageUrl%>\" alt=\"preview\"/>\n  <br/>\n  <label>Why do you want to post this?</label>\n  <br/>\n  <select name=\"verbs\" multiple size=\"6\">\n  	<option selected=\"true\">Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <br/>\n  <label>What is it? (optional)</label>\n  <br/>\n  <input type=\"text\" class=\"span3\" name=\"tags\" placeholder=\"Add #tag\" />\n  <br/>\n  <input type=\"hidden\" name=\"imageId\" value=\"<%=imageId%>\" />\n  <button type=\"submit\" class=\"btn\">jumble it</button>\n</form>")
    };
  })();

}).call(this);
