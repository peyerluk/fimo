@fimo.views.add "login", ->
  
  template: _.template(
    """
    <div class="narrow">
      <div class="handwriting handwriting-login">
        good to have you back!
      </div>
      
      <div class="alert alert-error" style="display:none">
        Die E-Mail Adresse oder das Passwort stimmt nicht.
      </div>  
      <form class="login" id="loginForm">
        <input type="email" placeholder="email" name="email" id="email"}>
        <input type="password" placeholder="password" name="password" id="password">
        <br>
        <button class="btn btn-form btn-primary" type="submit">login</button>
      </form>

    </div>
    """
  )
  
  click: (event) ->
    console.log("clicked in login")
    
    
  loaded: ->
    fimo.events.on "click", this.click
    $('#loginForm').submit ->
      fimo.data.post 'login', { email: $('input#email').val(), password: $('input#password').val() }, ->
        # store user to local store
        window.localStorage.setItem('user', JSON.stringify({ email: $('input#email').val(), password: $('input#password').val() }))
        fimo.controller.jumbles()
      , ->
        $('.alert-error').show()
        
      false
      
  destroy: ->
    fimo.events.off "click", this.click