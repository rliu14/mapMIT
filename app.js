/* Lead author: Elysa
 * Modeled on app.js in fritter-react by 6.170 TAs 
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var webpackDevHelper = require('./hotReload.js');

// Require routes
var events = require('./routes/events');
var groups = require('./routes/groups');
var users = require('./routes/users');

// User model for authentication
var User = require('./models/User');

// Connect to database
var mongoose = require('mongoose');
console.log('process env MONGODB_URI');
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mapmit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// Set up webpack-hot-middleware for development, express-static for production
console.log('process.env.NODE_ENV');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production'){
	console.log("DEVELOPMENT: Turning on WebPack middleware...");
	app = webpackDevHelper.useWebpackMiddleware(app);
	app.use('/css', express.static(path.join(__dirname, 'public/css')));
	app.use('/vendor', express.static(path.join(__dirname, 'public/vendor')));
} else {
	console.log("PRODUCTION: Serving static files from /public...");
	app.use(express.static(path.join(__dirname, 'public')));
}

// Set up some middleware to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret : 'mapmit', resave : true, saveUninitialized : true }));

app.use(function(req, res, next) {
	if (req.session.email) {
		User.findUser(req.session.email, function(err, user) {
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

// Set up routes
app.use('/events', events);
app.use('/groups', groups);
app.use('/users', users);
app.get('*', function(req, res){
 	res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Export our app (so that tests and bin can find it)
module.exports = app;