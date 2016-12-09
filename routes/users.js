/* Lead author: Casey */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');
var mongoose = require('mongoose');

var nev = require('email-verification')(mongoose);
nev.configure({
	verificationURL : 'http://localhost:3000/email-verification/${URL}',
	persistentUserModel : User,
	expirationTime : 600, 
	transportOptions : {
		service: 'Gmail',
		auth: {
			user : 'mapmitrecd@gmail.com',
			pass: 'recdpassword'
		}
	}
}, function(err, options){
	if (err) {
		console.log(err);
		return;
	}
	console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

var requireAuthentication = function(req, res, next) {
	if (!req.currentUser) {
		utils.sendErrorResponse(res, 403, 'Must be logged in to continue.');
	} else {
		next();
	}
};

router.post('/logout', requireAuthentication);

var isValid = function(req, res) {
	if (req.currentUser) {
		utils.sendErrorResponse(res, 403, 'There is already a user logged in.');
		return false;
	} else if (!(req.body.email && req.body.password)) {
		console.log("CHECKING if user is valid...");
		console.log(req.body);
		utils.sendErrorResponse(res, 400, 'Email or password not provided.');
		return false;
	}
	return true;
};

// register
// router.post('/', function(req, res) {
// 	var newUser = User({
// 		username: req.body.username,
// 		email: req.body.email,
// 		password: req.body.password
// 	});

// registration route
router.post('/', function(req, res) {
	console.log("REQ BODY: ", req.body);

	User.createUser(req.body.fullname, req.body.email, req.body.password, function(err, user) {
		if (err) {
			if (err.taken) {
				utils.sendErrorResponse(res, 400, 'This email has been taken!');
			} else if (err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error has occurred.');
			}
		} else {
			// utils.sendSuccessResponse(res);
			console.log("nev user: ", user);
			
			nev.createTempUser(user.user, function(error, existingPersistentUser, newTempUser) {

				console.log("Error", error);
				console.log("persistent user", existingPersistentUser);
				console.log("temp user", newTempUser);
				if (error) {
					console.log(error);
					return res.status(404).send('Creating temp user FAILED');
				}
				if (existingPersistentUser) {
					return res.json({ msg : 'You have already signed up and confirmed your account. Did you forget your password?' });
				}

				if (newTempUser) {
					var URL = newTempUser[nev.options.URLFieldName];
					console.log("url: ", URL);
					console.log("getting email for verification email...", newTempUser.email);
					nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
						console.log("verification email error: ", err);
						console.log("verification email info: ", info);
						if (err) {
							return res.status(404).send('sending verification email FAILED');
						}
						res.json({
							msg : 'An email has been sent to you. Please check it to verify your account.',
							info : info
						});
					});
				} else {
					res.json({
						msg : 'You have already signed up. Please check your email to verify your account.'
					});
				}
			});
		}
	});
});

router.post('/login', function(req, res) {
	if (isValid(req, res)) {
		User.authUser(req.body.email, req.body.password, function(err, result) {
			if (err) {
				utils.sendErrorResponse(res, 403, err);
			} else {
				req.session.email = req.body.email;
				utils.sendSuccessResponse(res, { email : req.body.email });
			}
		});
	}
});

router.get('/email-verification/:URL', function(req, res) {
	var url = req.params.URL;
	console.log("GET REQUEST in user ROUTE");
	console.log(url);
	nev.confirmTempUser(url, function(err, user) {
		console.log("this is the user when confirming TEMP USER");
		console.log(user);
		if (user) {
			console.log("confirming temp user now...");
			console.log(user);
			nev.sendConfirmationEmail(user.email, function(err, info) {
				if (err) {
					return res.status(404).send('sending confirmation email FAILED');
				}
				res.json({
					success : true,
					info : info
				});
				// utils.sendSuccessResponse(res, { success : true, info: info });
			});
			// utils.sendSuccessResponse(res, { success : true, info : info });
		} else {
			return res.status(404).send('confirming temp user FAILED');
		}
	});
});

router.put('/logout', function(req, res) {
	req.session.destroy();
	utils.sendSuccessResponse(res);
});

router.get('/current', function(req, res) {
	if (req.currentUser) {
		utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.email });
	} else {
		utils.sendSuccessResponse(res, { loggedIn : false });
	}
});

module.exports = router;