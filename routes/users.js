var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');
var mongoose = require('mongoose');
var TempUser = require('../models/TempUser');

var nev = require('email-verification')(mongoose);
nev.configure({
	verificationURL : 'http://localhost:3000/email-verification/${URL}',
	persistentUserModel : User,
	tempUserModel : TempUser,
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

// nev.generateTempUserModel(User, function(err, tempUserModel) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}

// 	console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
// });

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
	} else if (!(req.body.username && req.body.password)) {
		utils.sendErrorResponse(res, 400, 'Username or password not provided.');
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

router.post('/', function(req, res) {
	var user = new TempUser(req.body);
	console.log(req.body);
	nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
		console.log("error: ", err);
		console.log("persistent: ", existingPersistentUser);
		console.log("new temp: ", newTempUser);
		if (err) {
			return res.status(400).json(err);
		}
		if (existingPersistentUser) {
			return res.json({msg: 'You have already signed up and confirmed your account!'});
		}
		if (newTempUser) {
			var URL = newTempUser[nev.options.URLFieldName];
			nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
				if (err) {
					return res.status(500).json({msg: 'ERROR: sending verification email FAILED'});
				}
				res.status(200).json({message: 'An email has been sent to you. Please check it to verify your account.'});
			})
		} else {
			return res.status(409).json({
				message: 'You have already signed up. Please check your email to verify your account.'
			});
		}
	})

	// User.createUser(req.body.username, req.body.email, req.body.password, function(err, user) {
	// 	if (err) {
	// 		if (err.taken) {
	// 			utils.sendErrorResponse(res, 400, 'That username is already taken!');
	// 		} else if (err.msg) {
	// 			utils.sendErrorResponse(res, 400, err.msg);
	// 		} else {
	// 			utils.sendErrorResponse(res, 500, 'An unknown error has occurred.');
	// 		}
	// 	} else {
	// 		// utils.sendSuccessResponse(res);
	// 		console.log("nev user: ", user);
			
	// 		nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
	// 			console.log("Error", err);
	// 			console.log("persistent user", existingPersistentUser);
	// 			console.log("temp user", newTempUser);
	// 			if (err) {
	// 				console.log(err);
	// 				return res.status(404).send('Creating temp user FAILED');
	// 			}
	// 			if (existingPersistentUser) {
	// 				return res.json({ msg : 'You have already signed up and confirmed your account. Did you forget your password?' });
	// 			}

	// 			if (newTempUser) {
	// 				var URL = newTempUser[nev.options.URLFieldName];
	// 				nev.sendVerificationEmail(email, URL, function(err, info) {
	// 					if (err) {
	// 						return res.status(404).send('sending verification email FAILED');
	// 					}
	// 					res.json({
	// 						msg : 'An email shas been sent to you. Please check it to verify your account.',
	// 						info : info
	// 					});
	// 				});
	// 			} else {
	// 				res.json({
	// 					msg : 'You have already signed up. Please check your email to verify your account.'
	// 				});
	// 			}
	// 		});
	// 	}
	// });
});

router.post('/login', function(req, res) {
	if (isValid(req, res)) {
		User.authUser(req.body.username, req.body.password, function(err, result) {
			if (err) {
				utils.sendErrorResponse(res, 403, err);
			} else {
				req.session.username = req.body.username;
				utils.sendSuccessResponse(res, { user : req.body.username });
			}
		});
	}
});

router.get('/email-verification/:URL', function(req, res) {
	var url = req.params.URL;
	nev.confirmTempUser(url, function(err, user) {
		if (user) {
			nev.sendConfirmationEmail(user.email, function(err, info) {
				if (err) {
					return res.status(404).send('sending confirmation email FAILED');
				}
				res.json({
					msg : 'confirmed!',
					info : info
				});
			});
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
		utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
	} else {
		utils.sendSuccessResponse(res, { loggedIn : false });
	}
});

module.exports = router;