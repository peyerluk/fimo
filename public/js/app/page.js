(function() {

  this.fimo.page = (function() {
    var $page, scrollable;
    $page = $("#page");
    scrollable = void 0;
    return {
      create: function(content, _arg) {
        var scroll;
        scroll = (_arg != null ? _arg : {}).scroll;
        if (scroll == null) {
          scroll = true;
        }
        this.destroyPage();
        $page.html(content);
        if (scroll) {
          return scrollable = new iScroll("page", {
            hScrollbar: false,
            vScrollbar: false
          });
        }
      },
      update: function(content) {
        return true;
      },
      destroyPage: function() {
        if (scrollable) {
          scrollable.destroy();
          return scrollable = void 0;
        }
      }
    };
  })();

}).call(this);
