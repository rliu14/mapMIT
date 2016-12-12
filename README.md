Using MapMIT
==========

MapMIT Instructions
--------------
* To sign up, you must enter your full name, email, and password. 
* Your email must be an @mit.edu email in order to be valid, and you will be sent an email with a link to validate your account on signup.
* Your password must consist of 5-16 alphanumeric characters.
* Your homepage will show all events happening now by default.
* You may wish to filter events by an combination of event type, time, and location. 
* By clicking on the map popups, you can see the details of events that are happening at that location.
* Navigate to "My Events" in order to view/edit events you have created, or create a new event.
* In order to create a new event, you must provide the following: name, start time, end time, location.
* Navigate to "My Groups" in order to view groups you have created, add new members, and view groups you are a part of. You can only
add members to groups you have created, and remove yourself from groups that you have been added to.

Running MapMIT Locally
==========

NPM Install
--------------
Use 
```
npm install
```
to install all of MapMIT's dependencies.

Run MapMIT
--------------
Use
```
npm start
```
to run MapMIT. 

Navigate to `http://localhost:3000`.

Testing
--------------
Install the Mocha command line tool globally.
Run `mocha` to run all the tests.

File Authorship
--------------
models/Event.js : Dora

models/Group.js : Elysa

models/Location.js : Rena

models/User.js : Casey

react/Elements/DateTimePicker.jsx : Rena

react/Elements/EventTable.jsx : Elysa

react/Elements/Filtering.jsx : Dora & Rena

react/Elements/LocationPicker.jsx : Rena

react/Elements/Map.jsx : Rena

react/Elements/NavBar.jsx : Casey

react/Pages/CreateEvent.jsx : Dora

react/Pages/EditEvent.jsx : Dora

react/Pages/Homepage.jsx : Elysa

react/Pages/Login.jsx : Casey

react/Pages/MyEvents.jsx : Dora

react/Pages/MyGroups.jsx : Elysa

react/Pages/NotFound.jsx : Elysa

react/Pages/Signup.jsx : Casey

react/Pages/VerifyAccount.jsx : Casey

react/App.jsx : Elysa

react/clientRoutes.jsx : Elysa

react/main.js : Elysa

routes/events.js : Dora

routes/groups.js : Elysa

routes/users.js : Casey

services/eventServices.js : Dora

services/groupServices.js : Elysa

services/userServices.js : Casey

test/eventTests.js : Dora

test/groupTests.js : Elysa

test/locationTests.js : Rena

test/userTests.js : Casey
