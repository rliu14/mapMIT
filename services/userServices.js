const BASE_URL = 'http://localhost:3000/users';

var request = require('request-promise-native');

export default {
	register : (email, password) => {
		return request({
			uri : BASE_URL,
			method : 'POST',
			json : true,
			body : {
				username : email,
				password : password
			}
		});
	},

	verifyAccount : (URL) => {
		return request({
			uri : BASE_URL + '/email-verification' + `/${URL}`,
			method : 'GET',
			json : true
		})
	},

	login : (email, password) => {
		return request({
			uri : BASE_URL + '/login',
			method : 'POST',
			body : {
				username : email,
				password : password
			},
			json : true
		});
	},

	logout : () => {
		return request({
			uri : BASE_URL + '/logout',
			method: 'PUT',
			json : true
		});
	},

	getCurrentUser: () => {
		return request({
			uri : BASE_URL + '/current',
			method : 'GET',
			json : true
		});
	}
}