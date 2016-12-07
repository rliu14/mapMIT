var mongoose = require('mongoose');

var tempUserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	GENERATED_VERIFYING_URL: String
});

var TempUser = mongoose.model('TempUser', tempUserSchema);
module.exports = TempUser;