var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var webpackDevHelper = require('./hotReload.js');

// Require routes.
var events = require('./routes/events');
var groups = require('./routes/groups');
var locations = require('./routes/locations');
var users = require('./routes/users');

// Require Users model for authentication.
var User = require('./models/User');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mapmit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Set up webpack-hot-middleware for development, express-static for production
if (process.env.NODE_ENV !== 'production'){
  console.log("DEVELOPMENT: Turning on WebPack middleware...");
  app = webpackDevHelper.useWebpackMiddleware(app);
  app.use('/css', express.static(path.join(__dirname, 'public/css')));
  app.use('/vendor', express.static(path.join(__dirname, 'public/vendor')));
} else {
  console.log("PRODUCTION: Serving static files from /public...");
  app.use(express.static(path.join(__dirname, 'public')));
}
// Set up some middleware to use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));

// Authentication middleware. This function
// is called on _every_ request and populates
// the req.currentUser field with the logged-in
// user object based off the username provided
// in the session variable (accessed by the
// encrypted cookied).
// Same as example notes app. Many thanks and appreciates.
app.use(function(req, res, next) {
  if (req.session.username) {
    Users.findUser(req.session.username, function(err, user) {
      if (user) {
        req.currentUser = user;
      } else {
        req.session.destroy();
      }
      next();
    });
  } else {
    next();
  }
});

// Set up our routes.
app.use('/events', events);
app.use('/groups', groups);
app.use('/locations', locations);
app.use('/users', users);
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Export our app (so that tests and bin can find it)
module.exports = app;