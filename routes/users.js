/* Lead author: Casey */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');
var mongoose = require('mongoose');

/** Configures nev, the email verification module */
var nev = require('email-verification')(mongoose);
nev.configure({
	verificationURL : 'http://localhost:3000/email-verification/${URL}',
	persistentUserModel : User,
	expirationTime : 6000, 
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
	console.log('req current user : ', req.currentUser);
	if (req.currentUser) {
		utils.sendErrorResponse(res, 403, 'There is already a user logged in.');
		return false;
	} else if (!(req.body.email && req.body.password)) {
		utils.sendErrorResponse(res, 400, 'Email or password not provided.');
		return false;
	}
	return true;
};

/**
 * Registers a new user.
 * 
 * Request: POST /users/
 *
 * Body:
 * {
 * 	fullname: String,
 * 	email: String,
 * 	password: String
 * }
 *
 * Response:
 * On success:
 * {
 *  msg: 'An email has been sent to you. Please check it to verify your account.',
 *  info: info
 * }
 *
 * On username already exists:
 * {
 *  msg: You have already signed up and confirmed your account. Please proceed to login.,
 * }
 */
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
			nev.createTempUser(user, function(error, existingPersistentUser, newTempUser) {
				if (error) {
					return res.status(404).send('Creating temp user FAILED');
				}
				if (existingPersistentUser) {
					return res.json({ msg : 'You have already signed up and confirmed your account. Please proceed to login.' });
				}

				if (newTempUser) {
					var URL = newTempUser[nev.options.URLFieldName];
					nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
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

/**
 * Logs in a registered user.
 * 
 * Request: POST /users/login
 *
 * Body:
 * {
 * 	email: String,
 * 	password: String
 * }
 *
 * Response:
 * On success:
 * {
 *  email: email
 * }
 */
router.post('/login', function(req, res) {
	console.log(req);
	if (isValid(req, res)) {
		User.authUser(req.body.email, req.body.password, function(err, result) {
			if (err) {
				utils.sendErrorResponse(res, 403, err);
			} else {
				req.session.email = req.body.email;
				utils.sendSuccessResponse(res, { email : req.body.email,
												 fullname : result.fullname });
			}
		});
	}
});

/**
 * Verifies a newly registered user.
 * 
 * Request: GET /users/email-verification/:URL
 *
 * Params:
 * {
 * 	URL: String
 * }
 *
 * Response:
 * On success:
 * {
 *  success: true,
 *	info: info
 * }
 */
router.get('/email-verification/:URL', function(req, res) {
	var url = req.params.URL;
	nev.confirmTempUser(url, function(err, user) {
		if (user) {
			nev.sendConfirmationEmail(user.email, function(err, info) {
				if (err) {
					return res.status(404).send('sending confirmation email FAILED');
				}
				res.json({
					success : true,
					info : info
				});
			});
		} else {
			return res.status(404).send('confirming temp user FAILED');
		}
	});
});

/**
 * Logs out the user.
 * 
 * Request: PUT /users/logout
 */
router.put('/logout', function(req, res) {
	req.session.destroy();
	utils.sendSuccessResponse(res);
});

/**
 * Gets the current user information.
 * 
 * Request: GET /users/current
 *
 * Response:
 * If logged in:
 * {
 *	loggedIn: true,
 *	user: email	
 * }
 * If not logged in:
 * {
 *	loggedIn: false	
 * }
 */
router.get('/current', function(req, res) {
	if (req.currentUser) {
		utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.email });
	} else {
		utils.sendSuccessResponse(res, { loggedIn : false });
	}
});

module.exports = router;