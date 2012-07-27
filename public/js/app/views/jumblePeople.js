(function() {

  this.fimo.views.add("jumblePeople", function() {
    return {
      template: _.template("<div class=\"page\" style=\"min-height:0px;\">\n<form id=\"jumblePeopleForm\">\n  <div class=\"handwriting\">\n    Who would like this jumble? Invite at least 5 friends to get started, because jumblin alone ain't no fun.\n  </div>\n  <div class=\"separator separator-3\"><em>Invite your friends</em></div>\n  <a href=\"\" id=\"friendsLink\"><img src=\"img/add-friends.png\" alt=\"add friends\" style=\"margin-left: 90px;\"/></a><br/>\n  <select name=\"friends\" multiple size=\"6\" id=\"friends\" style=\"display:none;\">\n  </select>\n  <div class=\"separator separator-4\"><em>Add a personal message (optional)</em></div>\n  <textarea name=\"message\" class=\"input-large\" id=\"message\" placeholder=\"Hi! I just started a new jumble. Have a look. http://jum.bl/<%=name%>\">\n  </textarea>\n  <button type=\"submit\" class=\"btn btn-primary btn-form-large\">publish your jumble</button>\n</form>\n</div>"),
      onContactsSuccess: function(contacts) {
        return this.populateFriends(contacts);
      },
      onContactsError: function(contactError) {
        return alert("error: " + contactError);
      },
      populateFriends: function(friends) {
        var friend, prename, surname, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = friends.length; _i < _len; _i++) {
          friend = friends[_i];
          prename = "";
          surname = "";
          if (friend.name.givenName) {
            prename = friend.name.givenName;
          }
          if (friend.name.familyName) {
            surname = friend.name.familyName;
          }
          $('#friends').append("<option value='name'>" + prename + " " + surname + "</option>");
          _results.push($('#friends').show());
        }
        return _results;
      },
      loaded: function() {
        var extendInstanceArguments,
          _this = this;
        if (!this.instanceArguments['invitation']) {
          this.instanceArguments['invitation'] = {};
        }
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            invitation: {
              jumbleFriendsMessage: $('#message').val(),
              jumbleSelectedFriends: $('#friends').val()
            }
          });
        };
        if (this.instanceArguments['invitation']['jumbleFriendsMessage']) {
          $('#message').val(this.instanceArguments['jumbleFriendsMessage']);
        }
        $('#friendsLink').click(function() {
          if (fimo.device.isBrowser()) {
            return _this.populateFriends([
              {
                name: {
                  givenName: "Lukas",
                  familyName: "Peyer"
                }
              }, {
                name: {
                  givenName: "Gabriel"
                }
              }
            ]);
          } else {
            fimo.device.ready(function() {
              var fields, options;
              options = new ContactFindOptions();
              options.filter = "";
              options.multiple = true;
              fields = ["displayName", "name", "emails", "phoneNumbers"];
              navigator.contacts.find(fields, _.bind(_this.onContactsSuccess, _this), _.bind(_this.onContactsError, _this), options);
              return false;
            });
            return false;
          }
        });
        $('#jumblePeopleForm').submit(function(event) {
          event.preventDefault();
          console.log("creating jumble...");
          _this.instanceArguments['tags'] = _.map(_this.instanceArguments['tags'].split(","), function(tag) {
            return $.trim(tag).toLowerCase();
          });
          _this.instanceArguments['primaryObject']['tags'] = _.map(_this.instanceArguments['primaryObject']['tags'].split(","), function(tag) {
            return $.trim(tag).toLowerCase();
          });
          fimo.data.post('jumbles/create', _this.instanceArguments, function() {
            fimo.cache.remove("jumbles");
            return fimo.controller.jumbles();
          }, function() {
            return alert("error");
          });
          return false;
        });
        return $('#back').click(function() {
          extendInstanceArguments();
          fimo.controller['jumbleObject'](_this.instanceArguments);
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#object}");
      }
    };
  });

}).call(this);
