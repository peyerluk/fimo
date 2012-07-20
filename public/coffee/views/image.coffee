@fimo.views.add "image", ->
  
  template: _.template(
    """
    <div>
      <img src='<%= imageUrl %>' class="portrait" width="300">
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
    console.log("destroyed image")




