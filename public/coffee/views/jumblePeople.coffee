@fimo.views.add "jumblePeople", ->
  
  template: _.template(
    """
    <a href="" id="back">back</a>
    <p>Who would like this jumble? Invite at least 5 friends to get started, because jumblin alone ain't no fun.</p>
    <form id="jumblePeopleForm">
      <label>Invite your friends</label>
      <a href="" id="friendsLink">Select from your contacts</a><br/>
      <select name="friends" multiple size="6" id="friends" style="display:none;">
      </select>
      <label>Add a personal message (optional)</label>
      <br/>
      <input type="text" name="message" id="message" placeholder="Hi! I just started a new jumble. Have a look. http://jum.bl/<%=jumbleName%>" />
      <br/>
      <button type="submit" class="btn">next step</button>
    </form>
    """
  )
  
  onContactsSuccess: (contacts) ->
    @populateFriends(contacts)

  onContactsError: (contactError) ->
    alert("error: #{contactError}")
    
  populateFriends: (friends) ->
    for friend in friends
      # if @instanceArguments['jumbleSelectedFriends']
      # TODO: see if in selected friends and pre-select if so
      # TODO: don't show pre or surname if it is null
      $('#friends').append("<option value='name'>#{friend.name.givenName} #{friend.name.familyName}</option>")
      $('#friends').show()
  
  loaded: ->
    if @instanceArguments['jumbleFriendsMessage']
      $('#message').val(@instanceArguments['jumbleFriendsMessage'])
    
    $('#friendsLink').click =>
      if fimo.device.getAgent() == "browser"
        @populateFriends([{ name: { givenName: "Lukas", familyName: "Peyer" } }, { name: { givenName: "Gabriel", familyName: "Hase" } }])
      else
        fimo.device.ready =>    
          options = new ContactFindOptions()
          options.filter = ""
          options.multiple = true 
          fields = ["displayName", "name", "emails", "phoneNumbers"];
          navigator.contacts.find(fields, _.bind(@onContactsSuccess, @), _.bind(@onContactsError, @), options);
          false
        false        
    
    $('#jumbleObjectForm').submit =>
      alert("not implemented yet")
      false
      
    $('#back').click =>
      fimo.page.create(fimo.views.jumbleObject(_.extend(@instanceArguments, { jumbleFriendsMessage: $('#message').val(), jumbleSelectedFriends: $('#friends').val() })))  
      false
      
  destroy: ->
    console.log("destroyed jumbles#object}")