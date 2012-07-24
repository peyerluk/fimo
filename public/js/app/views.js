(function() {

  this.fimo.views = (function() {
    var current, currentViewArguments, history, next, nextViewArguments;
    history = [];
    current = void 0;
    next = void 0;
    nextViewArguments = void 0;
    currentViewArguments = void 0;
    fimo.events.on("newPage", function() {
      if (current) {
        current.destroy();
        history.push(current.name);
      }
      return current = void 0;
    });
    fimo.events.on("pageLoaded", function() {
      current = next;
      currentViewArguments = nextViewArguments;
      nextViewArguments = void 0;
      next = void 0;
      fimo.events.fire("afterPageLoaded", current != null ? current.name : void 0, currentViewArguments);
      if (current) {
        return current.loaded();
      }
    });
    return {
      moveBack: function() {
        if (history.length) {
          return history.pop();
        } else {
          return void 0;
        }
      },
      add: function(name, module) {
        var view;
        view = module();
        view.name = name;
        return this[name] = function() {
          next = view;
          view['instanceArguments'] = arguments[0] || {};
          nextViewArguments = view['instanceArguments'];
          return view.template.apply(void 0, arguments);
        };
      },
      message: _.template("<div class=\"page\">\n  <%= message %>\n</div>")
    };
  })();

}).call(this);
