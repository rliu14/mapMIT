/* Lead author: Casey */

var request = require('request-promise-native');
var constants = require('../utils/constants');
const BASE_URL_USERS = constants.BASE_URL + '/users'; 

export default {
	register : (fullname, email, password) => {
		console.log('user service register...');
		console.log('BASE URL');
		console.log(constants.BASE_URL);
		return request({
			uri : BASE_URL_USERS,
			method : 'POST',
			json : true,
			body : {
				fullname : fullname,
				email : email,
				password : password
			}
		});
	},

	verifyAccount : (URL) => {
		return request({
			uri : BASE_URL_USERS + '/email-verification' + `/${URL}`,
			method : 'GET',
			json : true
		})
	},

	login : (email, password) => {
		console.log('user service login...');
		console.log('BASE URL');
		console.log(constants.BASE_URL);
		return request({
			uri : BASE_URL_USERS + '/login',
			method : 'POST',
			body : {
				email : email,
				password : password
			},
			json : true
		});
	},

	logout : () => {
		return request({
			uri : BASE_URL_USERS + '/logout',
			method: 'PUT',
			json : true
		});
	},

	// TODO does this even get used?
	getCurrentUser: () => {
		return request({
			uri : BASE_URL_USERS + '/current',
			method : 'GET',
			json : true
		});
	}
}