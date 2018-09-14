const {google} = require('googleapis');
const authorize = require("./auth.js");
const directory = require("./directory.js");
const names = require("./names.js");

authorize.start(main);

function generateUserResources() {
  let userResources = []

  let i = 0;
  while(i < 10) {
    let firstName = names.first[Math.floor(Math.random()*names.first.length)];
    let lastName = names.last[Math.floor(Math.random()*names.last.length)];
    userResources.push({
      resource: {
        name: {
          givenName: firstName,
          familyName: lastName
        },
        password: 'dogcat22',
        primaryEmail: i+"@jopfre.com"
      }
    })
    i++;
  }
  return userResources;
}

  
const userKeys = [
  "0@jopfre.com",
  "1@jopfre.com",
  "2@jopfre.com",
  "3@jopfre.com",
  "4@jopfre.com",
  "5@jopfre.com",
  "6@jopfre.com",
  "7@jopfre.com",
  "8@jopfre.com",
  "9@jopfre.com"
];

function main(auth) {
  const admin = google.admin({version: 'directory_v1', auth});
  let userResources = generateUserResources();
  // directory.listUsers(admin);

  // directory.addUsers(admin, userResources);
  directory.spousify(admin);
  // directory.deleteUsers(admin, userKeys); 
}