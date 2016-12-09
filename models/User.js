/* Lead author: Casey */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var nev = require('email-verification')(mongoose);

var userSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	password: String
});

userSchema.statics.findUser = function(email, callback) {
	this.findOne({ email : email }, function(err, result) {
		if (err) callback({ msg : err });
		if (result !== null) {
			callback(null, result);
		} else {
			callback({ msg : 'No such user!' });
		}
	});
};

userSchema.statics.createUser = function(fullname, email, password, callback) {
	console.log("creating a new user...");
	var items = email.split('@');
	if (items[1] === 'mit.edu' && typeof fullname === 'string' && typeof password === 'string') {
		this.find({ email : email }, function(err, result) {
			if (err) callback(err);
			else if (result.length === 0) {
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(password, salt);
				var user = new User({
					fullname: fullname,
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
			var items = result[0].email.split('@');
			if (items[1] !== 'mit.edu') {
				callback({ msg : 'You must have an MIT email account to proceed.' });
			}
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