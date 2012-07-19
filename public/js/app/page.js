(function() {

  this.fimo.page = (function() {
    var scrollable;
    scrollable = void 0;
    return {
      $page: $("#page"),
      $second: $("#second-page"),
      $navbar: $("#navbar"),
      $title: $("#navbar-title"),
      create: function(content, _arg) {
        var navbar, scroll, slideDirection, title, _ref;
        _ref = _arg != null ? _arg : {}, scroll = _ref.scroll, slideDirection = _ref.slideDirection, navbar = _ref.navbar, title = _ref.title;
        fimo.events.fire("newPage");
        if (scroll == null) {
          scroll = true;
        }
        if (slideDirection == null) {
          slideDirection = void 0;
        }
        if (navbar == null) {
          navbar = true;
        }
        if (navbar) {
          this.$navbar.show();
        } else {
          this.$navbar.hide();
        }
        if (title) {
          this.$title.text(title);
        } else {
          this.$title.html("&nbsp;");
        }
        this.$page.hide();
        this.$second.hide();
        this.destroyPage();
        this.$page.html(content);
        if (scroll) {
          scrollable = new iScroll(this.$page[0], {
            hScrollbar: false,
            vScrollbar: false
          });
        }
        if (slideDirection) {
          return this.slideIn(slideDirection);
        } else {
          this.$page.show();
          return setTimeout(function() {
            fimo.events.fire("pageLoaded");
            if (scrollable) {
              return scrollable.refresh();
            }
          }, 0);
        }
      },
      slideIn: function(slideDirection) {
        var element, startX;
        startX = slideDirection === "right" ? 320 : -320;
        element = this.$page[0];
        element.style.webkitTransform = "translate3d(" + startX + "px, 0, 0)";
        this.$page.show();
        element.style.webkitTransition = "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)";
        element.style.webkitTransform = "translate3d(" + 0. + "px, 0, 0)";
        this.swapPageContainers();
        return setTimeout(function() {
          return fimo.events.fire("pageLoaded");
        }, 400);
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
        this.$second = temp;
        return this.$page.html("");
      }
    };
  })();

}).call(this);
