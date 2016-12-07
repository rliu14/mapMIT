var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var nev = require('email-verification')(mongoose);

var userSchema = new mongoose.Schema({
	email: String,
	password: String
});

userSchema.statics.findUser = function(email, callback) {
	this.findOne({ email : email }, function(err, result) {
		if (err) callback({ msg : err });
		if (result !== null) {
			console.log('Finding user...', result);
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

userSchema.statics.createUser = function(email, password, callback) {
	console.log("creating a new user...");
	var items = email.split('@');
	if (items[1] === 'mit.edu' && typeof password === 'string') {
		this.find({ email : email }, function(err, result) {
			if (err) callback(err);
			else if (result.length === 0) {
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(password, salt);
				var user = new User({
					email: email,
					password: hash,
				});

				callback(null, {user: user});

				// user.save(function(err, result) {
				// 	if (err) callback(err);
				// 	else callback(null, { user: user, username : username });
				// });
			} else {
				callback({ taken : 'User already exists.' });
			}
		});
	} else {
		if (callback) {
			callback({ msg : 'Invalid email/password.' });
		}
	}
};

userSchema.statics.authUser = function(email, password, callback) {
	this.find({ email : email }, function(err, result) {
		if (err) callback(err);
		else if (result.length > 0) {
			if (bcrypt.compareSync(password, result[0].password)) {
				callback(null, { email : email });
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