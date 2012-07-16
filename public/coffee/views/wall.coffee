@fimo.views.add "wall", ->
  imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i
  
  template: _.template(
    """
    <ul id="wall" class="clearfix">
    <% _.each(images, function(image) { %>
      <li><img src='<%= image %>' width="100" height="100"></li> 
    <% }); %>
    </ul>
    """
  )
  
  click: (event) ->
    console.log("clicked in wall")
    imageSrc = event.target.getAttribute("src")
    if imageSrc
      result = imageIdRegex.exec(imageSrc)
      if result
        fimo.controller.image(result[0])
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click
    console.log("destroyed wall")

