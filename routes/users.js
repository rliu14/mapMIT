var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');

var requireAuthentication = function(req, res, next) {
	if (!req.currentUser) {
		utils.sendErrorResponse(res, 403, 'Must be logged in.');
	} else {
		next();
	}
};

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
router.post('/', function(req, res) {
	User.createUser(req.body.username, req.body.password, function(err) {
		if (err) {
			if (err.taken) {
				utils.sendErrorResponse(res, 400, 'That username is already taken!');
			} else if (err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error has occurred.');
			}
		} else {
			utils.sendSuccessResponse(res);
		}
	});
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

router.post('/logout', requireAuthentication) // hmmmmm was in fritter-react but not sure about this
router.post('/logout', function(req, res) {
	if (req.currentUser) {
		req.session.destroy();
		utils.sendSuccessResponse(res);
	} else {
		utils.sendErrorResponse(res, 403, 'There is no user currently logged in.');
	}
});

router.get('/current', function(req, res) {
	if (req.currentUser) {
		utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
	} else {
		utils.sendSuccessResponse(res, { loggedIn : false });
	}
})

module.exports = router;