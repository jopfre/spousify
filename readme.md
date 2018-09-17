# About

Hi OVO, here is a little demo I have made for you to show you how I meet some of your reqs. Spousify is a **node.js** command line app built on top of the **Google Admin Directory API**. It lets you generate some random users and add them to the Google Admin console. You can then see who the users are and delete them if you like. The main feature is Spousify which automatically weds each user with another to automate the marriage process :)

# Install

Clone the repo down and run `npm install`

Paste my Google business account credentials and token in the root folder.

# Run

There are 4 commands currently implemented

`clean` - deletes all users apart fro the main admin (but they get are divorced as their spouse no longer exists)

`gen` - generates 10 new users with randomly assigned names.

`list` - lists 10 users an their marital status

`spouse` spousifies all users by pairing them up randomly and setting their relationship type to spouse and value to each other.

run them by typing `npm run` and the name of the command. e.g. `npm run clean`
