var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

userSchema.statics.findUser = function(username, callback) {
	this.findOne({ username : username }, function(err, result) {
		if (err) callback({ msg : err });
		if (result !== null) {
			callback(null, result);
		} else {
			callback({ msg : 'No such user!' });
		}
	});
};

// userSchema.statics.checkPassword = function(username, password, callback) {
// 	this.findOne({ username : username }, function(err, result) {
// 		if (err) callback({ msg: err });
// 		if (result !== null && password === result.password) {
// 			callback(null, true);
// 		} else {
// 			callback(null, false);
// 		}
// 	});
// };

userSchema.statics.createUser = function(username, password, callback) {
	if (username.match('^[a-z0-9_-]{3,16}$') && typeof password === 'string') {
		this.find({ username : username }, function(err, result) {
			if (err) callback(err);
			else if (result.length === 0) {
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(password, salt);
				var user = new User({
					username: username,
					password: hash,
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
};

userSchema.statics.authUser = function(username, password, callback) {
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
};

var User = mongoose.model('User', userSchema)
module.exports = User;