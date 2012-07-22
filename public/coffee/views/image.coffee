@fimo.views.add "image", ->
  
  template: _.template(
    """
    <div>
      <div class="object-image">
        <img src='<%= imageUrl %>' class="portrait" width="300">
        <ul class="tags">
          <li><a href="">vintage</a></li>
          <li><a href="">decoration</a></li>
        </ul>
      </div>
    </div>
    """
  )
  
  click: (event) ->
    # todo
    true
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click




