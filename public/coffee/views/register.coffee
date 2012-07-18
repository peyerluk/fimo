@fimo.views.add "register", ->
  
  template: _.template(
    """
    <div class="narrow">
      <div class="handwriting handwriting-login">
        Get started!
      </div>
    
      <div class="alert alert-error" style="display:none">
        Die Registrierung war nicht erfolgreich.
      </div>
      <form id="registerForm">
        <input type="text" placeholder="full name" name="name", id="name">
        <input type="email" placeholder="email" name="email", id="email">
        <input type="password" placeholder="password" name="password", id="password">
        <br>
        <button class="btn btn-form btn-primary" type="submit">register</button>
      </form>

    </div>
    """
  )
  
  loaded: ->
    $('#registerForm').submit ->
      console.log "registering in on login form..."
      fimo.data.post 'register', { email: $('input#email').val(), username: $('input#name').val(), password: $('input#password').val() }, ->
        # store user to local store
        window.localStorage.setItem('user', JSON.stringify({ email: $('input#email').val(), password: $('input#password').val() }))
        fimo.controller.jumbles()
      , ->
        $('.alert-error').show()
        
      false
      
  destroy: ->
    console.log("destroyed login")