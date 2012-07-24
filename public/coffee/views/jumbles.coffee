@fimo.views.add "jumbles", ->
  
  # todo: need to figure out how to nest templates, before we can use this
  jumble = _.template(
    """
    <div class="jumble">
      <h2><%= title %></h2>
      <div class="jumble-image">
        <img src="<%= imageSrc %>" width="300">
      </div>
      <div class="description">Zürich</div>
    </div>
    """
  )
  
  template: _.template(
    """
    <div class="jumble-wall">
      <div class="handwriting handwriting-jumbles">
        <h3>welcome to jumbler!</h3>
        If you don't find a jumble that suits you, open your own
        by clicking the plus.
      </div>
      
      <div class="jumble">
        <h2>Rearrange your home</h2>
        <div class="jumble-image">
          <img src="http://fimo.s3.amazonaws.com/images/4fff0a570df2a02233000017_300x.jpg" width="300">
          <ul class="tags">
            <li><a href="">decoration</a></li>
            <li><a href="">modern</a></li>
          </ul>
        </div>
        <div class="description">Zürich</div>
      </div>
      <div class="jumble">
        <h2>Wooden Furniture</h2>
        <div class="jumble-image">
          <img src="http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_300x.jpg" width="300">
          <ul class="tags">
            <li><a href="">wood</a></li>
            <li><a href="">vintage</a></li>
            <li><a href="">furniture</a></li>
          </ul>
        </div>
        <div class="description">Zürich</div>
      </div>
    </div>
    """
  )
  
  click: (event) ->
    jumble = $(event.target).parents(".jumble")
    if jumble.length
      fimo.controller.wall( "500d748aa52aa5516c000004" )
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click
    
    