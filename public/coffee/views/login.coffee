@fimo.views.add "login" ->
  
  template: _.template(
    """
    <div class="narrow">
      <div class="handwriting">
        good to have you back!
      </div>
  
      <form class="login">
        <input type="email" placeholder="email" name="email">
        <input type="password" placeholder="password" name="password">
        <br>
        <button class="btn btn-form btn-primary" type="submit">login</button>
      </form>

    </div>
    """
  )
  
  init: ->
    true
  
  destroy: ->
    true