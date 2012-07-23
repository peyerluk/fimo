(function() {

  this.fimo.page = (function() {
    return {
      $page: $("#page"),
      $second: $("#second-page"),
      $navbar: $("#navbar"),
      $title: $("#navbar-title"),
      currentLevel: 2,
      create: function(content, _arg) {
        var level, scroll, slideDirection, title, _ref, _ref1;
        _ref = _arg != null ? _arg : {}, scroll = _ref.scroll, title = _ref.title, level = _ref.level;
        fimo.events.fire("newPage");
        slideDirection = void 0;
        if (scroll == null) {
          scroll = false;
        }
        if ((_ref1 = this.scrollable) == null) {
          this.scrollable = void 0;
        }
        if (level == null) {
          level = void 0;
        }
        if (level) {
          if (level > this.currentLevel) {
            slideDirection = "right";
          } else if (level < this.currentLevel) {
            slideDirection = "left";
          }
          this.currentLevel = level;
        }
        this.$title = $("#navbar-title");
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
          this.scrollable = new iScroll(this.$page[0], {
            hScrollbar: false,
            vScrollbar: false
          });
        }
        if (slideDirection) {
          return this.slideIn(slideDirection, bezier);
        } else {
          this.$page.show();
          return setTimeout(function() {
            fimo.events.fire("pageLoaded");
            if (this.scrollable) {
              return this.scrollable.refresh();
            }
          }, 0);
        }
      },
      slideIn: function(slideDirection, bezier) {
        var element, startX,
          _this = this;
        bezier = bezier || "-webkit-transform 400ms cubic-bezier(0.33, 0.66, 0.66, 1)";
        startX = slideDirection === "right" ? 320 : -320;
        element = this.$page[0];
        element.style.webkitTransform = "translate3d(" + startX + "px, 0, 0)";
        this.$page.show();
        element.style.webkitTransition = bezier;
        element.style.webkitTransform = "translate3d(" + 0. + "px, 0, 0)";
        this.swapPageContainers();
        return setTimeout(function() {
          element.style.webkitTransition = "";
          element.style.webkitTransform = "";
          fimo.events.fire("pageLoaded");
          if (_this.scrollable) {
            return _this.scrollable.refresh();
          }
        }, 420);
      },
      update: function(content) {
        return true;
      },
      destroyPage: function() {
        if (this.scrollable) {
          this.scrollable.destroy();
          return this.scrollable = void 0;
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
