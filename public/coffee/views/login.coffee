@fimo.views.add "login", ->
  
  template: _.template(
    """
    <div class="narrow">
      <div class="handwriting handwriting-login">
        good to have you back!
      </div>
  
      <form class="login">
        <input type="email" placeholder="email" name="email">
        <input type="text" placeholder="password" name="password">
        <br>
        <button class="btn btn-form btn-primary" type="submit">login</button>
      </form>

    </div>
    """
  )
  
  click: (event) ->
    console.log("clicked in login")
    if event.target.getAttribute("type") == "submit"
      event.preventDefault()
      fimo.controller.jumbles()
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click
    console.log("destroyed login")