(function() {

  this.fimo.page = (function() {
    var scrollable;
    scrollable = void 0;
    return {
      $page: $("#page"),
      $second: $("#second-page"),
      create: function(content, _arg) {
        var element, scroll;
        scroll = (_arg != null ? _arg : {}).scroll;
        if (scroll == null) {
          scroll = true;
        }
        this.destroyPage();
        this.$page.hide();
        this.$second.hide();
        this.$page.html(content);
        element = this.$page[0];
        element.style.webkitTransform = "translate3d(" + 320. + "px, 0, 0)";
        this.$page.show();
        element.style.webkitTransition = "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)";
        element.style.webkitTransform = "translate3d(" + 0. + "px, 0, 0)";
        if (scroll) {
          scrollable = new iScroll(this.$page[0], {
            hScrollbar: false,
            vScrollbar: false
          });
        }
        return this.swapPageContainers();
      },
      update: function(content) {
        return true;
      },
      destroyPage: function() {
        if (scrollable) {
          scrollable.destroy();
          return scrollable = void 0;
        }
      },
      swapPageContainers: function() {
        var temp;
        temp = this.$page;
        this.$page = this.$second;
        return this.$second = temp;
      }
    };
  })();

}).call(this);
