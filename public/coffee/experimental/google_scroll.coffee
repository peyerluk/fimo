@fimo.Scroller = Scroller = (@element) ->
  @startTouchY = 0
  @animateTo(0)

  element.addEventListener("touchstart", this, false)
  element.addEventListener("touchmove", this, false)
  element.addEventListener("touchend", this, false)


Scroller.prototype.handleEvent = (e) ->
  switch e.type
    when "touchstart"
      @onTouchStart(e)
    when "touchmove"
      @onTouchMove(e)
    when "touchend"
      @onTouchEnd(e)
  

Scroller.prototype.onTouchStart = (e) ->
  # This will be shown in part 4.
  @stopMomentum()

  @startTouchY = e.touches[0].clientY
  @contentStartOffsetY = @contentOffsetY
  @startTouch = new Date().getTime()

Scroller.prototype.onTouchMove = (e) ->
  @currentTouchY = e.touches[0].clientY
  @currentDeltaY = @currentTouchY - @startTouchY  
  if @isDragging()
    newY = @currentDeltaY  + @contentStartOffsetY
    @animateTo(newY)


Scroller.prototype.onTouchEnd = (e) ->
  if @isDragging()
    @endTouch = new Date().getTime()
    
    if @shouldStartMomentum()
      # This will be shown in part 3.
      @doMomentum()
    else
      @snapToBounds()

Scroller.prototype.animateTo = (offsetY) ->
  @contentOffsetY = offsetY

  # We use webkit-transforms with translate3d because these animations
  # will be hardware accelerated, and therefore significantly faster
  # than changing the top value.
  @element.style.webkitTransform = "translate3d(0, #{ offsetY }px, 0)"


# Implementation of this method is left as an exercise for the reader.
# You need to measure the current position of the scrollable content
# relative to the frame. If the content is outside of the boundaries
# then simply reposition it to be just within the appropriate boundary.
Scroller.prototype.snapToBounds = () ->
  # todo

# Implementation of this method is left as an exercise for the reader.
# You need to consider whether their touch has moved past a certain
# threshold that should be considered ‘dragging’.
Scroller.prototype.isDragging = () ->
  true
 

# Implementation of this method is left as an exercise for the reader.
# You need to consider the end velocity of the drag was past the
# threshold required to initiate momentum.
Scroller.prototype.shouldStartMomentum = () ->
  true

# Implement getEndVelocity using the start and end position / time.
Scroller.prototype.getEndVelocity = () ->
  time = @endTouch - @startTouch
  velocity = @currentDeltaY / time
  # alert(velocity)
  velocity
  
Scroller.prototype.isDecelerating = () ->
  # todo
  true

Scroller.prototype.doMomentum = () ->
  
  # Calculate the movement properties.
  velocity = this.getEndVelocity()
  acceleration = if velocity < 0 then 0.0005 else -0.0005
  displacement = - (velocity * velocity) / (2 * acceleration)
  time = - velocity / acceleration

  # Set up the transition and execute the transform. Once you implement this
  # you will need to figure out an appropriate time to clear the transition
  # so that it doesn’t apply to subsequent scrolling.
  this.element.style.webkitTransition = "-webkit-transform #{ time }ms cubic-bezier(0.33, 0.66, 0.66, 1)"

  newY = this.contentOffsetY + displacement
  this.contentOffsetY = newY
  this.element.style.webkitTransform = "translate3d(0, #{ newY }px, 0)"
  

Scroller.prototype.stopMomentum = () ->
  if this.isDecelerating()
    
    # Get the computed style object.
    style = document.defaultView.getComputedStyle(this.element, null)
    
    # Computed the transform in a matrix object given the style.
    transform = new WebKitCSSMatrix(style.webkitTransform)
    
    # Clear the active transition so it doesn’t apply to our next transform.
    this.element.style.webkitTransition = ""
    
    # Set the element transform to where it is right now.
    this.animateTo(transform.m42)
  

