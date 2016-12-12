/* Lead author: Casey */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

/** Schema to represent the User model */
var userSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	password: String
});

/**
 * Finds a user in the database.
 * @param {String} email The email of the user.
 * @param {Function} callback The callback function to execute, of the
 *      format callback(err, result).
 */
userSchema.statics.findUser = function(email, callback) {
	console.log('email');
	console.log(email);
	this.findOne({ email : email }, function(err, result) {
		if (err) callback({ msg : err });
		if (result !== null) {
			callback(null, result);
		} else {
			callback({ msg : 'No such user!' });
		}
	});
};

/**
 * Creates a user model. It is important to note that this user is not immediately persisted to the database,
 *		as the user must go through the email verification process before being added to the database.
 * @param {String} fullname The full name of the user.
 * @param {String} email The email of the user.
 * @param {String} password The password of the user.
 * @param {Function} callback The callback function to execute, of the
 *      format callback(err, user).
 */
userSchema.statics.createUser = function(fullname, email, password, callback) {
	var items = email.split('@');
	if (items[1] === 'mit.edu' && typeof fullname === 'string' && password.match('^[a-zA-z0-9]{5,16}$')) {
		this.find({ email : email }, function(err, result) {
			if (err) callback(err);
			else if (result.length === 0) {
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(password, salt);
				var user = new User ({
					fullname: fullname,
					email: email,
					password: hash,
				}, callback);
				callback(null, user);
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

/**
 * Authenticates a user.
 * @param {String} email The email of the user.
 * @param {String} password The password of the user.
 * @param {Function} callback The callback function to execute, of the
 *      format callback(err, email).
 */
userSchema.statics.authUser = function(email, password, callback) {
	this.find({ email : email }, function(err, result) {
		if (err) callback(err);
		else if (result.length > 0) {
			var items = result[0].email.split('@');
			if (items[1] !== 'mit.edu') {
				callback({ msg : 'You must have an MIT email account to proceed.' });
			}
			if (bcrypt.compareSync(password, result[0].password)) {
				callback(null, { email : email,
								 fullname : result[0].fullname });
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