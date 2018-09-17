const {google} = require('googleapis');``

module.exports = {
  /**
   * Lists the first 10 users in the domain.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  listUsers: function(admin) {
    admin.users.list({
      customer: 'my_customer',
      maxResults: 10,
      orderBy: 'email',
    }, (err, res) => {
      if (err) return console.error('The API returned an error:', err.message);
      const users = res.data.users;
      if (users.length) {
        console.log('Users:');
        users.forEach((user) => {
          if (user.relations && user.relations[0].value) {
            admin.users.get({userKey: user.relations[0].value}, (err, res) => {
              if (err) console.log(err);
              let spouse = res.data.name.fullName;
              console.log(user.primaryEmail +" (" + user.name.fullName +") is spoused with "+ spouse);
            });
          } else {
            console.log(user.primaryEmail +" (" + user.name.fullName +") User has no relations.");
          }
        });
      } else {
        console.log('No users found.');
      }
    });
  },
  addUsers: function(admin, userResources) {
    let usersProcessed = 0;
    userResources.forEach((userResource, index, array) => {
      admin.users.insert(userResource, () => {
        console.log("Added: " + userResource.resource.name.givenName + " " + userResource.resource.name.familyName);
        usersProcessed++;
        if (usersProcessed === array.length) {
          this.listUsers(admin) 
        }
      });
    });
  },
  deleteUsers: function(admin, userKeys) {
    let usersProcessed = 0;
    userKeys.forEach((userKey, index, array) => {
      admin.users.delete({ userKey: userKey}, () => {
        console.log("deleted "+userKey);
        usersProcessed++;
        if(usersProcessed === array.length) {
          this.listUsers(admin);
        }
      });
    });
  },
  getUserKeys: function(admin, callback) {
    let userKeys = [];
    admin.users.list({
      customer: 'my_customer',
      maxResults: 10,
      orderBy: 'email',
    }, (err, res) => {
      if (err) console.error('1 The API returned an error:', err.message);
      users = res.data.users;
      users.forEach((user, index, array) => {
        userKeys.push(user.primaryEmail);
      });
      callback(userKeys);
    });
  },
  spousify: function(admin) { //Randomly pairs up users at sets their relationship to be spouse of each other
    function pair(index) {
      if(index%2) { //if odd
        return index-1;
      } else {
        return index+1;
      }
    }
    this.getUserKeys(admin, (userKeys) => {
      let oddOneOut = '';
      userKeys.sort(function() {
        return 0.5 - Math.random();
      });
      if (userKeys.length%2) {
        oddOneOut = userKeys.pop();
      } 

      let usersProcessed = 0;
      userKeys.forEach((user, index, array) => {
          console.log('spousing ' + user + ' with '+ userKeys[pair(index)]);
          admin.users.update({
            userKey: user,
            resource: {
              "relations": [
                {
                  "value": userKeys[pair(index)],
                  "type": "spouse"
                }
              ]
            }
          }, (err, res) => {
            if (err) return console.error('The API returned an error:', err.message);
            usersProcessed++;
            if(usersProcessed === array.length) {
              this.listUsers(admin);
            }
          }); 

      });

    });

  }

}