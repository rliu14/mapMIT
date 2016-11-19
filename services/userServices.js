const BASE_URL = 'http://localhost:3000/users';

var request = require('request-promise-native');

export default {
	register : (username, password) => {
		return request({
			uri : BASE_URL,
			method : 'POST',
			json : true,
			body : {
				username : username,
				password : password
			}
		});
	},

	login : (username, password) => {
		return request({
			uri : BASE_URL + '/login',
			method : 'POST',
			body : {
				username : username,
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