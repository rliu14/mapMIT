var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	events: [String]
});

var userModel = mongoose.model('User', userSchema);

var Users = (function(userModel) {
	var that = {};

	that.findUser = function(username, callback) {
		userModel.findOne({ username : username }, function(err, result) {
			if (err) callback({ msg : err });
			if (result !== null) {
				callback(null, result);
			} else {
				callback({ msg : 'No such user!' });
			}
		});
	}

	that.checkPassword = function(username, password, callback) {
		userModel.findOne({ username : username }, function(err, result) {
			if (err) callback({ msg: err });
			if (result !== null && password === result.password) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}

	that.createUser = function(username, password, callback) {
		if (username.match('^[a-z0-9_-]{3,16}$') && typeof password === 'string') {
			this.find({ username : username }, function(err, result) {
				if (err) callback(err);
				else if (result.length === 0) {
					var salt = bcrypt.genSaltSync(10);
					var hash = bcrypt.hashSync(password, salt);
					var user = new userModel({
						username: username,
						password: hash,
						events: []
					});
					user.save(function(err, result) {
						if (err) callback(err);
						else callback(null, { username : username });
					});
				} else {
					callback({ msg : 'User already exists.' });
				}
			});
		} else {
			if (callback) {
				callback({ msg : 'Invalid username/password.' });
			}
		}
	}

	that.authUser = function(username, password, callback) {
		this.find({ username : username }, function(err, result) {
			if (err) callback(err);
			else if (result.length > 0) {
				if (bcrypt.compareSync(password, result[0].password)) {
					callback(null, { username : username });
				} else {
					callback({ msg : 'Login failed.' });
				}
			} else {
				callback({ msg : 'Login failed.' });
			}
		});
	}

	Object.freeze(that);
	return that;

})(userModel);

module.exports = Users;