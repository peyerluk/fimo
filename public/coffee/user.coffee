@fimo.user = do ->
  
  # anonymous registering
  # create_user = ->
  #     # TODO: add in coordinates
  #     
  #     pretty_unique_name = "#{ Math.random().toString(32) }"
  #     fimo.data.post 'register', {email:"#{pretty_unique_name}@fimo.com", username:"#{pretty_unique_name}", password:"notsosecure"}, ->
  #       # login user
  #       fimo.data.post 'login', {email:"#{pretty_unique_name}@fimo.com", password:'notsosecure'}, ->
  #         # store user to local store
  #         store.set('user', {email:"#{pretty_unique_name}@fimo.com", password:'notsosecure'})
  #   
    
  ### PUBLIC ###
  
  loadUser = ->
    JSON.parse(window.localStorage.getItem('user'))
    
  init: ->
    #user = store.get('user')
    user = loadUser()
    if user
      # login user
      #console.log('logging in existing user: ' + user.email + ' ' + user.password)
      fimo.data.post 'login', { 'email': user.email, 'password': user.password }, ->
        fimo.controller.jumbles()
      , ->
        console.log "automatic login unsuccessful."
        fimo.controller.welcome()
    else
      fimo.controller.welcome()
        
  getId: ->
    user = loadUser()
    user.userId
    
  logout: ->
    window.localStorage.removeItem('user')
  
  

