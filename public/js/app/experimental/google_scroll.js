(function() {
  var Scroller;

  this.fimo.Scroller = Scroller = function(element) {
    this.element = element;
    this.startTouchY = 0;
    this.animateTo(0);
    element.addEventListener("touchstart", this, false);
    element.addEventListener("touchmove", this, false);
    return element.addEventListener("touchend", this, false);
  };

  Scroller.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "touchstart":
        return this.onTouchStart(e);
      case "touchmove":
        return this.onTouchMove(e);
      case "touchend":
        return this.onTouchEnd(e);
    }
  };

  Scroller.prototype.onTouchStart = function(e) {
    this.stopMomentum();
    this.startTouchY = e.touches[0].clientY;
    this.contentStartOffsetY = this.contentOffsetY;
    return this.startTouch = new Date().getTime();
  };

  Scroller.prototype.onTouchMove = function(e) {
    var newY;
    this.currentTouchY = e.touches[0].clientY;
    this.currentDeltaY = this.currentTouchY - this.startTouchY;
    if (this.isDragging()) {
      newY = this.currentDeltaY + this.contentStartOffsetY;
      return this.animateTo(newY);
    }
  };

  Scroller.prototype.onTouchEnd = function(e) {
    if (this.isDragging()) {
      this.endTouch = new Date().getTime();
      if (this.shouldStartMomentum()) {
        return this.doMomentum();
      } else {
        return this.snapToBounds();
      }
    }
  };

  Scroller.prototype.animateTo = function(offsetY) {
    this.contentOffsetY = offsetY;
    return this.element.style.webkitTransform = "translate3d(0, " + offsetY + "px, 0)";
  };

  Scroller.prototype.snapToBounds = function() {};

  Scroller.prototype.isDragging = function() {
    return true;
  };

  Scroller.prototype.shouldStartMomentum = function() {
    return true;
  };

  Scroller.prototype.getEndVelocity = function() {
    var time, velocity;
    time = this.endTouch - this.startTouch;
    velocity = this.currentDeltaY / time;
    return velocity;
  };

  Scroller.prototype.isDecelerating = function() {
    return true;
  };

  Scroller.prototype.doMomentum = function() {
    var acceleration, displacement, newY, time, velocity;
    velocity = this.getEndVelocity();
    acceleration = velocity < 0 ? 0.0005 : -0.0005;
    displacement = -(velocity * velocity) / (2 * acceleration);
    time = -velocity / acceleration;
    this.element.style.webkitTransition = "-webkit-transform " + time + "ms cubic-bezier(0.33, 0.66, 0.66, 1)";
    newY = this.contentOffsetY + displacement;
    this.contentOffsetY = newY;
    return this.element.style.webkitTransform = "translate3d(0, " + newY + "px, 0)";
  };

  Scroller.prototype.stopMomentum = function() {
    var style, transform;
    if (this.isDecelerating()) {
      style = document.defaultView.getComputedStyle(this.element, null);
      transform = new WebKitCSSMatrix(style.webkitTransform);
      this.element.style.webkitTransition = "";
      return this.animateTo(transform.m42);
    }
  };

}).call(this);
