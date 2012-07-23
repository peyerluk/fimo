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
  
  init: ->
    #user = store.get('user')
    user = JSON.parse(window.localStorage.getItem('user'))
    if user
      # login user
      #console.log('logging in existing user: ' + user.email + ' ' + user.password)
      fimo.data.post 'login', { 'email': user.email, 'password': user.password }, ->
        fimo.controller.jumbles()
      , ->
        console.log "automatic login unsuccessful. removing local storage user."
        window.localStorage.removeItem('user')
        #store.remove('user')
        #create_user()
    #else
      #console.log('about to create user')
      #create_user()
  
  logout: ->
    window.localStorage.removeItem('user')
  
  

